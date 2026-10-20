"""Resilient Food Equity & Surplus Broker — ADK Agent Package."""

from __future__ import annotations

from pathlib import Path

try:
    from dotenv import load_dotenv
    _ROOT_DIR = Path(__file__).resolve().parent.parent if "__file__" in globals() else Path.cwd()
    load_dotenv(_ROOT_DIR / ".env")
    load_dotenv()
except ImportError:
    pass

import os

if os.environ.get("GEMINI_API_KEY") and not os.environ.get("GOOGLE_API_KEY"):
    os.environ["GOOGLE_API_KEY"] = os.environ["GEMINI_API_KEY"]
elif os.environ.get("GOOGLE_API_KEY") and not os.environ.get("GEMINI_API_KEY"):
    os.environ["GEMINI_API_KEY"] = os.environ["GOOGLE_API_KEY"]

# agent.py already sets root_agent = None when google-adk is missing; anything else raising
# ImportError here is a real bug and should surface, not leave ADK with no agent.
from .agent import root_agent

__all__ = ["root_agent"]
