"""Resilient Food Equity & Surplus Broker — ADK Agent Package."""

from __future__ import annotations

try:
    from .agent import root_agent
except ImportError:
    root_agent = None

__all__ = ["root_agent"]
