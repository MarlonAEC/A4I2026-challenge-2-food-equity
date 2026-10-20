"""Lane 4 (Frontend UI Lead): FastAPI app for the food-rescue console.

File ownership (see docs/frontend_plan.md):
  - app/main.py           : routes + wiring only (shared, locked)
  - app/static/index.html : the console UI          (Track A)
  - app/static/intake.html: pantry intake mockup    (Track C)
  - app/brief.py          : POST /api/brief          (Track B)
  - app/equity.py         : GET  /api/equity_audit   (Track B)
"""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# Load .env from project root or current working directory
_ROOT_DIR = Path(__file__).resolve().parent.parent if "__file__" in globals() else Path.cwd()
load_dotenv(_ROOT_DIR / ".env")
load_dotenv()

from agent.tools import check_shelf_life_clock, find_and_rank_recipients

STATIC_DIR = Path(__file__).resolve().parent / "static"

app = FastAPI(title="RescueDispatch — A4I Challenge 2")
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


# Track B registers these routers; the app runs fine without them.
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
