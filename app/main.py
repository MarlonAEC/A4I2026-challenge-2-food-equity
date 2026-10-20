"""Lane 4 (Frontend UI Lead): FastAPI + Interactive Human-Centered Food Rescue Console with Leaflet Map."""

from __future__ import annotations

import os
from typing import Any
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

from agent.tools import check_shelf_life_clock, find_and_rank_recipients

app = FastAPI(title="RescueDispatch — A4I Challenge 2")


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "food-rescue-broker"}




class MatchRequest(BaseModel):
    posting_text: str = "10 crates of fresh spinach, harvested yesterday, needs cold storage and pickup before 8pm (6 hours left)"
    pallets_offered: int = 1
    donor_deadline_hours: float = 6.0
    requires_cold_storage: bool = True
    requires_pickup_van: bool = True
    declined_recipient_names: list[str] = []


@app.post("/api/match")
def api_match(req: MatchRequest) -> dict[str, Any]:
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
def index() -> str:
    return """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>RescueDispatch — Connecting Extra Food Before Time Runs Out</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Leaflet CSS & JS for Interactive City Map -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    #map { height: 280px; width: 100%; border-radius: 0.75rem; z-index: 10; }
    .leaflet-popup-content { font-family: inherit; font-size: 13px; line-height: 1.4; color: #0f172a; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-4 md:p-6 font-sans">
  <div class="max-w-7xl mx-auto space-y-5">
    
    <!-- Top Header -->
    <header class="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-2xl">🚐</span>
          <h1 class="text-2xl font-bold tracking-tight text-white">RescueDispatch</h1>
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-semibold">
            Live Console
          </span>
        </div>
        <p class="text-sm text-slate-400 mt-0.5">
          Connecting extra perishable food to local pantries with refrigerators before the clock runs out.
        </p>
      </div>
      <div class="flex items-center gap-3 text-xs">
        <span class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
          📍 Metro: <b>Chicago</b> (183 Pantries & Demographics)
        </span>
        <span class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
          🧠 Engine: <b>Google ADK + BigQuery Vector Search</b>
        </span>
      </div>
    </header>

    <!-- Main 2-Column Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- Left Column: The Offer (Supply Side) - 4 Cols -->
      <div class="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div>
          <h2 class="text-base font-bold text-white flex items-center gap-2">
            <span>📦</span> 1. We Have Extra Food
          </h2>
          <p class="text-xs text-slate-400 mt-0.5">
            Select a common scenario or type what needs to be picked up.
          </p>
        </div>

        <!-- 1-Click Scenario Buttons -->
        <div class="space-y-2">
          <label class="text-xs font-semibold text-slate-300 uppercase tracking-wider">Quick Scenarios:</label>
          <div class="flex flex-col gap-2">
            <button onclick="setScenario('10 crates of fresh spinach, harvested yesterday, needs cold storage', 1, 6)"
              class="text-left text-xs bg-slate-950 hover:bg-slate-800 p-3 rounded-xl border border-slate-800 hover:border-emerald-600 transition group">
              <div class="font-bold text-emerald-400 group-hover:text-emerald-300">🥬 Grocer: 10 Crates Fresh Spinach</div>
              <div class="text-slate-400 text-[11px] mt-0.5">6 hours left · Needs walk-in cooler · Catches the "No Fridge" decoy!</div>
            </button>

            <button onclick="setScenario('40 lbs prepared hot/chilled chicken & rice trays from catering, must move tonight', 1, 4)"
              class="text-left text-xs bg-slate-950 hover:bg-slate-800 p-3 rounded-xl border border-slate-800 hover:border-emerald-600 transition group">
              <div class="font-bold text-amber-400 group-hover:text-amber-300">🍗 Catering: Prepared Meal Trays</div>
              <div class="text-slate-400 text-[11px] mt-0.5">4 hours left · Ready to serve · Urgent hot meal shelter needed</div>
            </button>

            <button onclick="setScenario('60 gallons of milk and mixed yogurt crates, 2 days to date code', 2, 8)"
              class="text-left text-xs bg-slate-950 hover:bg-slate-800 p-3 rounded-xl border border-slate-800 hover:border-emerald-600 transition group">
              <div class="font-bold text-sky-400 group-hover:text-sky-300">🥛 Dairy: Milk & Yogurt Crates</div>
              <div class="text-slate-400 text-[11px] mt-0.5">8 hours left · Requires strict commercial refrigeration</div>
            </button>
          </div>
        </div>

        <!-- Form Inputs -->
        <div class="space-y-3 pt-2">
          <div>
            <label class="text-xs font-semibold text-slate-300">What is the food?</label>
            <textarea id="posting_text" rows="3"
              class="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl p-3 text-sm text-slate-200">10 crates of fresh spinach, harvested yesterday, needs cold storage</textarea>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs font-semibold text-slate-300">Amount (Pallets)</label>
              <input id="pallets" type="number" value="1" min="1" max="20"
                class="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl p-2.5 text-sm" />
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-300">Hours to Pick Up</label>
              <input id="hours" type="number" value="6" min="1" max="72"
                class="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl p-2.5 text-sm" />
            </div>
          </div>

          <div class="space-y-1.5 pt-1 text-xs text-slate-300">
            <label class="flex items-center gap-2 cursor-pointer">
              <input id="req_cold" type="checkbox" checked class="rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0" />
              <span>❄️ Needs refrigerator / walk-in cooler</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input id="req_van" type="checkbox" checked class="rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0" />
              <span>🚐 Pantry must pick up with their own van</span>
            </label>
          </div>

          <button onclick="runDispatch([])"
            class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2 text-sm">
            <span>🔍</span> Find Who Can Take It
          </button>
        </div>
      </div>

      <!-- Right Column: Interactive Map & Matches (Demand Side) - 8 Cols -->
      <div class="lg:col-span-8 space-y-4" id="results-panel">
        
        <!-- Welcome Placeholder (Replaced upon search) -->
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
          <div class="text-4xl">🗺️</div>
          <h3 class="text-lg font-bold text-white">Ready to match extra food</h3>
          <p class="text-sm text-slate-400 max-w-md mx-auto">
            Click <b>"Find Who Can Take It"</b> to search 180+ local food pantries by meaning, filter for refrigerator capacity, and preview the route on the map.
          </p>
        </div>

      </div>

    </div>
  </div>

  <script>
    let map = null;
    let markersLayer = null;
    let currentDeclined = [];
    const DONOR_LOCATION = [41.8781, -87.6298]; // Downtown Chicago pickup dock

    function initMap() {
      if (!map) {
        map = L.map('map', { zoomControl: true }).setView(DONOR_LOCATION, 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        markersLayer = L.layerGroup().addTo(map);
      }
    }

    function setScenario(text, pallets, hours) {
      document.getElementById('posting_text').value = text;
      document.getElementById('pallets').value = pallets;
      document.getElementById('hours').value = hours;
      currentDeclined = [];
      runDispatch([]);
    }

    function declineMatch(pantryName) {
      if (!currentDeclined.includes(pantryName)) {
        currentDeclined.push(pantryName);
      }
      runDispatch(currentDeclined);
    }

    async function runDispatch(declinedList = []) {
      currentDeclined = declinedList;
      const panel = document.getElementById('results-panel');
      panel.innerHTML = `
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
          <div class="animate-spin text-3xl">⚙️</div>
          <p class="text-sm font-semibold text-slate-200">Checking refrigerator capacity & finding closest pantries...</p>
        </div>
      `;

      try {
        const res = await fetch('/api/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            posting_text: document.getElementById('posting_text').value,
            pallets_offered: parseInt(document.getElementById('pallets').value || '1'),
            donor_deadline_hours: parseFloat(document.getElementById('hours').value || '6'),
            requires_cold_storage: document.getElementById('req_cold').checked,
            requires_pickup_van: document.getElementById('req_van').checked,
            declined_recipient_names: currentDeclined
          })
        });
        const data = await res.json();
        renderResults(data);
      } catch (err) {
        panel.innerHTML = `
          <div class="bg-rose-950/40 border border-rose-800 rounded-2xl p-6 text-rose-300 text-sm">
            <b>Error reaching dispatch engine:</b> ${err.message}
          </div>
        `;
      }
    }

    function renderResults(data) {
      const panel = document.getElementById('results-panel');
      const top = (data.matches && data.matches.length > 0) ? data.matches[0] : null;
      const backups = (data.matches && data.matches.length > 1) ? data.matches.slice(1) : [];
      const decoys = data.rejected_decoys || [];
      const clock = data.clock || {};

      let html = `
        <!-- Time & Safety Clock Banner -->
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div class="space-y-0.5">
            <div class="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <span>⏱️</span> Time Left on Clock
            </div>
            <div class="text-sm text-slate-200">
              Must be picked up within: <b class="text-white">${clock.effective_window_hours || 6} hours</b>
              <span class="text-slate-400 text-xs">(Based on donor deadline & USDA ${clock.matched_usda_product || 'freshness guidelines'})</span>
            </div>
          </div>
          ${top ? `
            <div class="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
              <span>✅</span> Top match can collect in ${top.pickup_window_hours}h (${top.margin_hours}h safe buffer)
            </div>
          ` : `
            <div class="px-3 py-1.5 rounded-xl bg-rose-950 border border-rose-700 text-rose-300 text-xs font-semibold">
              No matching pantries currently open
            </div>
          `}
        </div>

        <!-- Interactive Map Container -->
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div class="flex items-center justify-between text-xs text-slate-300 pb-1">
            <span class="font-bold flex items-center gap-1.5"><span>🗺️</span> Chicago Rescue Map</span>
            <div class="flex items-center gap-3 text-[11px]">
              <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span> Pickup Dock</span>
              <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Best Match</span>
              <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Backups</span>
              <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> Skipped (No Fridge)</span>
            </div>
          </div>
          <div id="map"></div>
        </div>
      `;

      if (top) {
        html += `
          <!-- Primary Match Card -->
          <div class="bg-gradient-to-b from-emerald-950/40 to-slate-900 border-2 border-emerald-500/80 rounded-2xl p-5 space-y-4 shadow-xl">
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <span class="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-extrabold tracking-wide uppercase">
                  ⭐ #1 Best Match to Take It
                </span>
                <h3 class="text-xl font-bold text-white mt-2">${top.name}</h3>
                <p class="text-sm text-slate-300 flex items-center gap-1.5 mt-0.5">
                  <span>📍</span> ${top.street}, ${top.city} ${top.zip_code}
                  <span class="text-emerald-400 font-semibold">(${top.distance_km} km away)</span>
                </p>
              </div>
              <div class="text-xs bg-slate-950/70 border border-emerald-800/60 p-2.5 rounded-xl space-y-1 text-slate-300">
                <div>❄️ Refrigerator: <b class="text-emerald-300">${top.cold_storage}</b></div>
                <div>🚐 Own Van: <b class="text-emerald-300">${top.refrigerated_transport ? 'Yes' : 'No'}</b></div>
                <div>⏱️ Pickup Speed: <b class="text-emerald-300">Within ${top.pickup_window_hours}h</b></div>
              </div>
            </div>

            <!-- Plain English Explanation -->
            <div class="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1 text-xs">
              <span class="text-slate-400 font-semibold uppercase tracking-wider">Why they can take it:</span>
              <p class="text-slate-200 text-sm leading-relaxed">${top.why_them}</p>
              <div class="text-slate-400 italic text-[11px] pt-1">
                Pantry profile quote: "${top.profile_text || ''}"
              </div>
            </div>

            <!-- Neighborhood Need (Census Demographics) -->
            <div class="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <div>
                <span class="text-slate-400">Neighborhood Poverty Rate:</span>
                <div class="text-sm font-bold text-slate-200">${top.equity_context.poverty_rate}%</div>
              </div>
              <div>
                <span class="text-slate-400">Households Without a Car:</span>
                <div class="text-sm font-bold text-slate-200">${top.equity_context.pct_no_vehicle}%</div>
              </div>
            </div>

            <!-- Ready-to-Send Text Message -->
            <div class="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
              <div class="text-xs font-semibold text-slate-400">📱 Text message ready to send to the pantry:</div>
              <div class="text-xs md:text-sm font-mono text-emerald-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800 select-all">
                ${top.draft_message}
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-3 pt-1">
              <button onclick="alert('Pickup alert text sent to ${top.name}! Volunteer driver notified.')"
                class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-md shadow-emerald-500/20">
                📲 Send Text to Pantry
              </button>
              <button onclick="declineMatch('${top.name}')"
                class="bg-rose-950/70 hover:bg-rose-900 text-rose-200 border border-rose-700/80 font-semibold px-4 py-2.5 rounded-xl text-sm transition">
                ❌ "They said no" — Show who's next
              </button>
            </div>
          </div>
        `;
      }

      // Queued Backups List
      if (backups.length > 0) {
        html += `
          <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2.5">
            <div class="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span>🔄</span> Queued Backups (If #1 is busy or says no)
            </div>
            <div class="space-y-2">
        `;
        for (const b of backups) {
          html += `
            <div class="flex flex-col sm:flex-row sm:items-center justify-between text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 gap-2">
              <div>
                <b class="text-amber-400">#${b.rank} ${b.name}</b> · ${b.street} (${b.distance_km} km away)
                <div class="text-slate-400 mt-0.5">${b.why_them}</div>
              </div>
              <div class="text-right whitespace-nowrap">
                <span class="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono">
                  ${b.pickup_window_hours}h pickup window
                </span>
              </div>
            </div>
          `;
        }
        html += `</div></div>`;
      }

      // Decoys & Safeguards
      if (decoys.length > 0) {
        html += `
          <div class="bg-rose-950/20 border border-rose-900/60 rounded-2xl p-4 space-y-2.5">
            <div class="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
              <span>🛡️</span> Why We Skipped Others (Safeguards Against Spoilage)
            </div>
            <div class="space-y-2">
        `;
        for (const d of decoys) {
          html += `
            <div class="text-xs bg-slate-950/90 p-3 rounded-xl border border-rose-900/40 text-slate-300">
              <span class="font-bold text-rose-400">⛔ ${d.name}</span>
              <span class="text-slate-400 text-[11px]">(Ranked #${d.semantic_rank} on AI text match)</span>
              <div class="mt-1 text-slate-300">${d.rejection_reason}</div>
            </div>
          `;
        }
        html += `</div></div>`;
      }

      panel.innerHTML = html;

      // Render Leaflet Map Pins
      setTimeout(() => {
        initMap();
        if (markersLayer) {
          markersLayer.clearLayers();

          // 1. Add Donor Pin (Blue/Dark)
          const donorMarker = L.circleMarker(DONOR_LOCATION, {
            radius: 10,
            fillColor: '#3b82f6',
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9
          }).addTo(markersLayer);
          donorMarker.bindPopup("<b>🏪 Donor Pickup Dock</b><br/>Food location in Chicago");

          // 2. Add Top Match Pin (Green)
          if (top && top.lat && top.lon) {
            const topMarker = L.circleMarker([top.lat, top.lon], {
              radius: 11,
              fillColor: '#10b981',
              color: '#ffffff',
              weight: 3,
              opacity: 1,
              fillOpacity: 0.95
            }).addTo(markersLayer);
            topMarker.bindPopup(`<b>⭐ #1 Match: ${top.name}</b><br/>${top.street}<br/>${top.distance_km} km away · Cold Storage: ${top.cold_storage}`);
          }

          // 3. Add Backups (Amber)
          backups.forEach(b => {
            if (b.lat && b.lon) {
              const bMarker = L.circleMarker([b.lat, b.lon], {
                radius: 8,
                fillColor: '#f59e0b',
                color: '#ffffff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.85
              }).addTo(markersLayer);
              bMarker.bindPopup(`<b>#${b.rank} Backup: ${b.name}</b><br/>${b.street}<br/>${b.distance_km} km away`);
            }
          });

          // 4. Add Decoy Pin (Red)
          const greenline = decoys.find(d => d.name && d.name.includes('Greenline'));
          if (greenline) {
            const decoyMarker = L.circleMarker([41.8756, -87.6472], {
              radius: 9,
              fillColor: '#ef4444',
              color: '#ffffff',
              weight: 2,
              opacity: 1,
              fillOpacity: 0.9
            }).addTo(markersLayer);
            decoyMarker.bindPopup(`<b>⛔ SKIPPED: Greenline Community Pantry</b><br/>Matched on greens, but has <b>NO REFRIGERATOR</b>!`);
          }

          if (top && top.lat && top.lon) {
            map.fitBounds([
              DONOR_LOCATION,
              [top.lat, top.lon],
              [41.8756, -87.6472]
            ], { padding: [40, 40] });
          }
        }
      }, 100);
    }
  </script>
</body>
</html>"""
