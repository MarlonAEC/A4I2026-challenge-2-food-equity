"""Lane 2 (ADK Agent Lead): Main ADK Agent Definition + MCP Integration."""

from __future__ import annotations

import os
from dotenv import load_dotenv

load_dotenv()

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
        model=os.environ.get("ADK_MODEL", "gemini-2.5-flash"),
        description=(
            "Real-time 'Uber for Food Rescue' broker that matches expiring restaurant/grocer "
            "surplus with verified food banks using BigQuery Vector Search and hard cold-chain constraints."
        ),
        instruction=SYSTEM_INSTRUCTION,
        tools=tools_list,
    )
except ImportError:
    root_agent = None
