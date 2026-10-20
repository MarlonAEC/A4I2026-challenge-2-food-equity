"""Lane 4 (Frontend UI Lead): FastAPI + Interactive 'Uber for Food Rescue' Dispatch Console."""

from __future__ import annotations

import os
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

# Load .env from project root or current working directory
_ROOT_DIR = Path(__file__).resolve().parent.parent if "__file__" in globals() else Path.cwd()
load_dotenv(_ROOT_DIR / ".env")
load_dotenv()

from agent.tools import check_shelf_life_clock, find_and_rank_recipients

app = FastAPI(title="Uber for Food Rescue — A4I Challenge 2")


@app.get("/healthz")
def healthz():
    return {"status": "ok", "service": "food-rescue-broker"}


class MatchRequest(BaseModel):
    posting_text: str = "10 crates of fresh spinach, harvested yesterday, needs cold storage and pickup before 8pm (6 hours left)"
    pallets_offered: int = 1
    donor_deadline_hours: float = 6.0
    requires_cold_storage: bool = True
    requires_pickup_van: bool = True
    declined_recipient_names: list[str] = []
    api_key: str | None = None


@app.post("/api/match")
def api_match(req: MatchRequest):
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
        requires_pickup_van=req.requires_pickup_van,
        declined_recipient_names=req.declined_recipient_names,
    )
    result["clock"] = clock
    return result


@app.get("/", response_class=HTMLResponse)
def index():
    return """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>RescueDispatch — Uber for Food Equity</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-6">
  <div class="max-w-6xl mx-auto space-y-6">
    <header class="flex items-center justify-between border-b border-slate-800 pb-4">
      <div>
        <h1 class="text-2xl font-bold text-emerald-400">🚐 RescueDispatch — Uber for Surplus Food</h1>
        <p class="text-sm text-slate-400">Powered by Google ADK · Gemini 2.5 Flash · BigQuery VECTOR_SEARCH · Census Equity Audit</p>
      </div>
      <span class="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-semibold">
        Metro: CHICAGO (a4i_food)
      </span>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column: Restaurant / Grocer Input -->
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <h2 class="text-lg font-semibold text-white">1. Post Expiring Surplus</h2>
        <div class="space-y-2">
          <label class="text-xs text-slate-400">Quick Demo Scenarios:</label>
          <div class="flex flex-col gap-2">
            <button onclick="setScenario('10 crates of fresh spinach, harvested yesterday, needs cold storage', 1, 6)"
              class="text-left text-xs bg-slate-800 hover:bg-slate-700 p-2.5 rounded-lg border border-slate-700">
              🥬 <b>Grocer Spinach Call</b> (10 crates, 6h deadline — tests Greenline Decoy!)
            </button>
            <button onclick="setScenario('40 lbs prepared restaurant chicken & rice trays, closing tonight', 1, 4)"
              class="text-left text-xs bg-slate-800 hover:bg-slate-700 p-2.5 rounded-lg border border-slate-700">
              🍗 <b>Restaurant Prepared Meals</b> (40 lbs hot/chilled trays, 4h deadline)
            </button>
          </div>
        </div>

        <div>
          <label class="text-xs text-slate-400">Surplus Description</label>
          <textarea id="posting_text" rows="3"
            class="w-full mt-1 bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm">10 crates of fresh spinach, harvested yesterday, needs cold storage</textarea>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs text-slate-400">Pallets</label>
            <input id="pallets" type="number" value="1"
              class="w-full mt-1 bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm" />
          </div>
          <div>
            <label class="text-xs text-slate-400">Hours Left on Clock</label>
            <input id="hours" type="number" value="6"
              class="w-full mt-1 bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm" />
          </div>
        </div>

        <div>
          <label class="text-xs text-slate-400 flex items-center justify-between">
            <span>🔑 Gemini API Key (Local Dev)</span>
            <span class="text-[10px] text-slate-500">Optional · persists locally</span>
          </label>
          <input id="api_key" type="password" placeholder="AIzaSy... (or load from .env)"
            class="w-full mt-1 bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs font-mono text-slate-200 focus:border-emerald-500 focus:outline-none" />
        </div>

        <button onclick="runDispatch([])"
          class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-lg transition">
          ⚡ Find & Dispatch Food Banks
        </button>
      </div>

      <!-- Right 2 Columns: Live Match Brief & Cascading Backups -->
      <div class="lg:col-span-2 space-y-4" id="results">
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
          Click <b>"⚡ Find & Dispatch Food Banks"</b> to run BigQuery Vector Search + Cold-Chain Constraint Filtering.
        </div>
      </div>
    </div>
  </div>

  <script>
    let declinedList = [];

    // Local storage key persistence for dev ease
    const API_KEY_STORAGE_KEY = 'rescue_gemini_api_key';
    const apiKeyInput = document.getElementById('api_key');
    if (apiKeyInput) {
      const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
      if (savedKey) {
        apiKeyInput.value = savedKey;
      }
      apiKeyInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        if (val) {
          localStorage.setItem(API_KEY_STORAGE_KEY, val);
        } else {
          localStorage.removeItem(API_KEY_STORAGE_KEY);
        }
      });
    }

    function setScenario(text, pallets, hours) {
      document.getElementById('posting_text').value = text;
      document.getElementById('pallets').value = pallets;
      document.getElementById('hours').value = hours;
      declinedList = [];
      runDispatch([]);
    }

    function declineCurrent(name) {
      declinedList.push(name);
      runDispatch(declinedList);
    }

    async function runDispatch(declined) {
      declinedList = declined;
      const keyVal = document.getElementById('api_key')?.value?.trim();
      const payload = {
        posting_text: document.getElementById('posting_text').value,
        pallets_offered: parseInt(document.getElementById('pallets').value || '1'),
        donor_deadline_hours: parseFloat(document.getElementById('hours').value || '6'),
        requires_cold_storage: true,
        requires_pickup_van: true,
        declined_recipient_names: declinedList
      };
      if (keyVal) {
        payload.api_key = keyVal;
      }
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      renderResults(data);
    }

    function renderResults(data) {
      const container = document.getElementById('results');
      const top = data.matches[0];
      const backups = data.matches.slice(1);

      let html = `
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span class="text-xs uppercase tracking-wider text-amber-400 font-semibold">⏱️ Spoilage & Pickup Clock</span>
            <p class="text-sm text-slate-200 mt-0.5">
              Effective Window: <b>${data.clock.effective_window_hours}h</b>
              (Donor Deadline: ${data.clock.donor_deadline_hours}h · USDA ${data.clock.matched_usda_product}: ${data.clock.usda_shelf_life_hours}h)
            </p>
            <p class="text-xs text-slate-400">${data.clock.caveat}</p>
          </div>
        </div>
      `;

      if (top) {
        html += `
          <div class="bg-emerald-950/30 border-2 border-emerald-600 rounded-xl p-5 space-y-3">
            <div class="flex items-start justify-between">
              <div>
                <span class="px-2.5 py-0.5 rounded bg-emerald-500 text-slate-950 text-xs font-bold">
                  #1 PRIMARY MATCH — DISPATCH READY
                </span>
                <h3 class="text-xl font-bold text-white mt-2">${top.name}</h3>
                <p class="text-sm text-slate-300">📍 ${top.street}, ${top.city} ${top.zip_code} (${top.distance_km} km away)</p>
              </div>
              <div class="text-right text-xs text-emerald-300">
                <div>❄️ Cold Storage: <b>${top.cold_storage}</b></div>
                <div>🚐 Own Reefer Van: <b>${top.refrigerated_transport ? 'YES' : 'NO'}</b></div>
                <div>⏱️ Pickup in <b>${top.pickup_window_hours}h</b> (${top.margin_hours}h margin)</div>
              </div>
            </div>

            <p class="text-sm text-slate-200 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <b>Why Them:</b> ${top.why_them}<br/>
              <span class="text-xs text-slate-400">"${top.profile_text}"</span>
            </p>

            <div class="text-xs text-slate-300 flex gap-4">
              <span>📊 <b>Who It Helps (Tract Equity):</b> ${top.equity_context.poverty_rate}% Poverty Rate</span>
              <span>🚗 <b>No-Vehicle Households:</b> ${top.equity_context.pct_no_vehicle}%</span>
            </div>

            <div class="bg-slate-950 border border-slate-800 rounded-lg p-3">
              <div class="text-xs text-slate-400 mb-1">📲 Ready-to-Send Dispatch SMS:</div>
              <div class="text-sm text-emerald-300 font-mono">${top.draft_message}</div>
            </div>

            <div class="flex gap-3 pt-2">
              <button onclick="alert('Pickup Dispatched to ' + '${top.name}!')"
                class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm">
                ✅ Send Pickup Alert
              </button>
              <button onclick="declineCurrent('${top.name}')"
                class="bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-700 font-semibold px-4 py-2 rounded-lg text-sm">
                ❌ "They Said No" → Auto-Route to Backup #2
              </button>
            </div>
          </div>
        `;
      }

      if (backups.length > 0) {
        html += `<div class="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <h4 class="text-sm font-semibold text-slate-300">🔄 Queued Backups (If #1 Declines)</h4>`;
        for (const b of backups) {
          html += `
            <div class="flex items-center justify-between text-xs bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div>
                <b>#${b.rank} ${b.name}</b> — ${b.street} (${b.distance_km} km)
                <div class="text-slate-400">${b.why_them}</div>
              </div>
              <span class="text-emerald-400 font-mono">${b.pickup_window_hours}h window</span>
            </div>`;
        }
        html += `</div>`;
      }

      if (data.rejected_decoys.length > 0) {
        html += `<div class="bg-rose-950/20 border border-rose-900/60 rounded-xl p-4 space-y-2">
          <h4 class="text-sm font-semibold text-rose-300">🛡️ Blocked Semantic Decoys & Contradictions (Why Vector Search Alone Fails)</h4>`;
        for (const d of data.rejected_decoys) {
          html += `
            <div class="text-xs bg-slate-950/90 p-2.5 rounded border border-rose-900/40 text-slate-300">
              <b class="text-rose-400">⛔ ${d.name}</b> (Semantic Rank #${d.semantic_rank}): ${d.rejection_reason}
            </div>`;
        }
        html += `</div>`;
      }

      container.innerHTML = html;
    }
  </script>
</body>
</html>"""
