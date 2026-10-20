"""Resilient Food Equity & Surplus Broker — ADK Agent Package."""

from __future__ import annotations

from pathlib import Path
from dotenv import load_dotenv

_ROOT_DIR = Path(__file__).resolve().parent.parent if "__file__" in globals() else Path.cwd()
load_dotenv(_ROOT_DIR / ".env")
load_dotenv()

import os

if os.environ.get("GEMINI_API_KEY") and not os.environ.get("GOOGLE_API_KEY"):
    os.environ["GOOGLE_API_KEY"] = os.environ["GEMINI_API_KEY"]
elif os.environ.get("GOOGLE_API_KEY") and not os.environ.get("GEMINI_API_KEY"):
    os.environ["GEMINI_API_KEY"] = os.environ["GOOGLE_API_KEY"]

try:
    from .agent import root_agent
except ImportError:
    root_agent = None

__all__ = ["root_agent"]
