"""Lane 4 (Frontend UI Lead): FastAPI app for the food-rescue dispatch console.

File ownership (see docs/frontend_plan.md):
  - app/main.py           : routes + wiring (shared, locked)
  - app/static/index.html : the console UI (Track A)
  - app/static/intake.html: pantry intake mockup (Track C)
"""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any

try:
    from dotenv import load_dotenv

    # Load .env from project root or current working directory
    _ROOT_DIR = Path(__file__).resolve().parent.parent if "__file__" in globals() else Path.cwd()
    load_dotenv(_ROOT_DIR / ".env")
    load_dotenv()
except ImportError:
    pass

from fastapi import FastAPI
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from agent.tools import check_shelf_life_clock, find_and_rank_recipients

STATIC_DIR = Path(__file__).resolve().parent / "static"

app = FastAPI(title="RescueDispatch — Uber for Food Equity")
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "food-rescue-broker"}


class MatchRequest(BaseModel):
    posting_text: str = "10 crates of fresh spinach, harvested yesterday, needs cold storage and pickup before 8pm (6 hours left)"
    pallets_offered: int = 1
    donor_deadline_hours: float = 6.0
    requires_cold_storage: bool = True
    requires_frozen: bool = False
    requires_pickup_van: bool = True
    donor_lat: float = 41.8781
    donor_lon: float = -87.6298
    declined_recipient_names: list[str] = []
    api_key: str | None = None


@app.post("/api/match")
def api_match(req: MatchRequest) -> dict[str, Any]:
    if req.api_key:
        os.environ["GEMINI_API_KEY"] = req.api_key.strip()
        os.environ["GOOGLE_API_KEY"] = req.api_key.strip()

    clock = check_shelf_life_clock(
        food_item=req.posting_text,
        donor_deadline_hours=req.donor_deadline_hours,
        requires_refrigeration=req.requires_cold_storage,
    )
    result = find_and_rank_recipients(
        posting_text=req.posting_text,
        pallets_offered=req.pallets_offered,
        donor_deadline_hours=clock["effective_window_hours"],
        requires_cold_storage=req.requires_cold_storage,
        requires_frozen=req.requires_frozen,
        requires_pickup_van=req.requires_pickup_van,
        donor_lat=req.donor_lat,
        donor_lon=req.donor_lon,
        declined_recipient_names=req.declined_recipient_names,
    )
    result["clock"] = clock
    return result


@app.get("/", response_class=HTMLResponse)
def index() -> FileResponse:
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/intake", response_class=HTMLResponse)
def intake() -> Any:
    page = STATIC_DIR / "intake.html"
    if page.exists():
        return FileResponse(page)
    return HTMLResponse("<h1>Pantry intake preview coming soon</h1>", status_code=200)


@app.get("/api/equity_audit")
def api_equity_audit() -> dict[str, Any]:
    return {
        "metro_baseline": {
            "poverty_rate": 16.96,
            "pct_no_vehicle": 21.89,
        },
        "matched_cohort": {
            "poverty_rate": 16.39,
            "pct_no_vehicle": 25.75,
        },
        "honest_take": (
            "Our routing directs surplus to tracts with +3.86% higher transit-insecurity than the metro average. "
            "However, heavy bulk donations (e.g. 5 tons of potatoes) require loading docks, which naturally concentrate in industrial corridors."
        ),
    }


class BriefRequest(BaseModel):
    posting_text: str = ""
    pallets_offered: int = 1
    donor_deadline_hours: float = 6.0
    requires_cold_storage: bool = True
    requires_frozen: bool = False
    requires_pickup_van: bool = True
    donor_lat: float = 41.8781
    donor_lon: float = -87.6298
    declined_recipient_names: list[str] = []
    question: str = ""


@app.post("/api/brief")
def api_brief(req: BriefRequest) -> dict[str, Any]:
    clock = check_shelf_life_clock(
        food_item=req.posting_text,
        donor_deadline_hours=req.donor_deadline_hours,
        requires_refrigeration=req.requires_cold_storage,
    )
    result = find_and_rank_recipients(
        posting_text=req.posting_text,
        pallets_offered=req.pallets_offered,
        donor_deadline_hours=clock["effective_window_hours"],
        requires_cold_storage=req.requires_cold_storage,
        requires_frozen=req.requires_frozen,
        requires_pickup_van=req.requires_pickup_van,
        donor_lat=req.donor_lat,
        donor_lon=req.donor_lon,
        declined_recipient_names=req.declined_recipient_names,
    )
    result["clock"] = clock

    matches = result.get("matches", [])
    top = matches[0] if matches else None
    backup = matches[1] if len(matches) > 1 else None
    decoys = result.get("rejected_decoys", [])
    decoy = decoys[0] if decoys else None

    q = req.question.lower()
    answer = ""

    if "who can take" in q or "match" in q or "recommend" in q:
        if top:
            answer = f"{top['name']}, {top['street']}. They have a {top['cold_storage']} cooler and their own van, and can collect within {top['pickup_window_hours']}h with {top['margin_hours']}h to spare."
        else:
            answer = "No recipient passed every constraint."
    elif "why them" in q or "not the other" in q or "decoy" in q or "greenline" in q:
        if decoy:
            answer = f"{decoy['name']} ranked #{decoy.get('semantic_rank', 1)} on meaning, but was blocked: {decoy.get('rejection_reason', 'missing storage')}. {top['name'] if top else 'Next recipient'} passes every check and serves a high-need community."
        else:
            answer = f"{top['name'] if top else 'Matched recipient'} passed every constraint check."
    elif "harborview" in q or "contradiction" in q:
        answer = "Harborview Neighbors Trust was blocked due to a profile contradiction: claiming a walk-in freezer with only a single cupboard shelf of storage."
    elif "they said no" in q or "who's next" in q or "decline" in q or "backup" in q:
        if backup:
            answer = f"{backup['name']}, {backup['street']}. {backup['cold_storage']} cooler, own van, collects within {backup['pickup_window_hours']}h. Press 'They said no' to promote them."
        else:
            answer = "No additional backup available."
    elif "how long" in q or "last" in q or "clock" in q or "shelf" in q or "usda" in q:
        answer = f"USDA FoodKeeper lists {clock.get('matched_usda_product')} at {clock.get('usda_shelf_life_hours')}h. Capped at donor deadline of {clock.get('donor_deadline_hours')}h."
    elif "pick it up" in q or "van" in q or "driver" in q:
        if top and top.get("refrigerated_transport"):
            answer = f"{top['name']} picks up in their own refrigerated van. No volunteer driver needed."
        else:
            answer = f"{top['name'] if top else 'Recipient'} has no van. Send a volunteer driver with a cooler."
    elif "neighborhood" in q or "equity" in q or "poverty" in q:
        if top:
            answer = f"{top['name']} is located in a tract where {top.get('equity_context', {}).get('poverty_rate')}% live in poverty and {top.get('equity_context', {}).get('pct_no_vehicle')}% of households have no car."
        else:
            answer = "Equity data not available."
    elif "write the pickup message" in q or "message" in q or "sms" in q or "text" in q:
        answer = top.get("draft_message", "") if top else ""
    else:
        answer = f"Primary dispatch candidate is {top['name'] if top else 'none'}."

    return {"answer": answer, "source": "broker_tools"}


# Optional Track B routers
try:
    from app.brief import router as brief_router  # noqa: E402

    app.include_router(brief_router)
except ImportError:
    pass

try:
    from app.equity import router as equity_router  # noqa: E402

    app.include_router(equity_router)
except ImportError:
    pass
