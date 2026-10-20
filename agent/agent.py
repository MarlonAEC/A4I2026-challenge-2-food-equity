"""Lane 2 (ADK Agent Lead): Main ADK Agent Definition + MCP Integration."""

from __future__ import annotations

import os
from pathlib import Path
try:
    from dotenv import load_dotenv

    # Load .env from project root or current working directory
    _ROOT_DIR = Path(__file__).resolve().parent.parent if "__file__" in globals() else Path.cwd()
    load_dotenv(_ROOT_DIR / ".env")
    load_dotenv()
except ImportError:
    pass

from .prompt import SYSTEM_INSTRUCTION
from .tools import (
    check_shelf_life_clock,
    dispatch_pickup_and_fallback,
    find_and_rank_recipients,
)

tools_list = [
    check_shelf_life_clock,
    find_and_rank_recipients,
    dispatch_pickup_and_fallback,
]

MCP_TOOLBOX_URL = os.environ.get("MCP_TOOLBOX_URL")
if MCP_TOOLBOX_URL:
    try:
        from toolbox_core import ToolboxSyncClient

        toolbox_client = ToolboxSyncClient(MCP_TOOLBOX_URL)
        tools_list.extend(toolbox_client.load_toolset())
    except Exception as exc:
        print(f"[agent] MCP Toolbox not reachable at {MCP_TOOLBOX_URL}: {exc}")

try:
    from google.adk.agents import Agent

    root_agent = Agent(
        name="food_equity_surplus_broker",
        model=os.environ.get("ADK_MODEL", "gemini-3.8-flash"),
        description=(
            "Real-time 'Uber for Food Rescue' broker that matches expiring restaurant/grocer "
            "surplus with verified food banks using BigQuery Vector Search and hard cold-chain constraints."
        ),
        instruction=SYSTEM_INSTRUCTION,
        tools=tools_list,
    )
except ImportError:
    root_agent = None


if __name__ == "__main__":
    import argparse
    import json

    parser = argparse.ArgumentParser(description="Food Rescue Surplus Broker — Agent CLI")
    parser.add_argument("--api-key", help="Gemini API Key (optional, defaults to GEMINI_API_KEY env or .env)")
    parser.add_argument(
        "--prompt",
        default="10 crates of fresh spinach, harvested yesterday, needs cold storage and pickup before 8pm",
        help="Surplus posting description to match",
    )
    args = parser.parse_args()

    if args.api_key:
        os.environ["GEMINI_API_KEY"] = args.api_key
        os.environ["GOOGLE_API_KEY"] = args.api_key
    elif os.environ.get("GEMINI_API_KEY") and not os.environ.get("GOOGLE_API_KEY"):
        os.environ["GOOGLE_API_KEY"] = os.environ["GEMINI_API_KEY"]
    elif os.environ.get("GOOGLE_API_KEY") and not os.environ.get("GEMINI_API_KEY"):
        os.environ["GEMINI_API_KEY"] = os.environ["GOOGLE_API_KEY"]

    active_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not active_key:
        print("💡 Tip: Provide an API key via --api-key <KEY>, .env file, or export GEMINI_API_KEY='...'")

    print(f"\n🔍 Querying broker with surplus offer: \"{args.prompt}\"")
    clock_res = check_shelf_life_clock(args.prompt, donor_deadline_hours=6.0)
    print(f"⏱️  Shelf-Life Clock: {clock_res['effective_window_hours']}h effective window (USDA: {clock_res['matched_usda_product']})")

    match_res = find_and_rank_recipients(
        posting_text=args.prompt,
        pallets_offered=1,
        donor_deadline_hours=clock_res["effective_window_hours"],
        requires_cold_storage=True,
        requires_pickup_van=True,
    )

    top = match_res["matches"][0]
    print(f"\n✅ #1 Primary Match: {top['name']} ({top['street']}, {top['city']})")
    print(f"   Why Them: {top['why_them']}")
    print(f"   Storage: {top['cold_storage']} | Own Reefer Van: {top['refrigerated_transport']} | Window: {top['pickup_window_hours']}h")
    print(f"   Tract Poverty: {top['equity_context']['poverty_rate']}% | No-Vehicle: {top['equity_context']['pct_no_vehicle']}%")
    print(f"\n📲 Ready-to-Send Dispatch Message:\n   {top['draft_message']}\n")
