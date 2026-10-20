#!/usr/bin/env bash
# ==============================================================================
# Food Rescue Surplus Broker — Local Development Runner
# ==============================================================================
# Usage:
#   ./scripts/run_local.sh                     # Launch FastAPI UI (http://localhost:8000)
#   ./scripts/run_local.sh <API_KEY>           # Launch with specified Gemini API key
#   ./scripts/run_local.sh --adk               # Launch Google ADK web UI
#   ./scripts/run_local.sh --cli               # Run standalone Agent CLI
#   ./scripts/run_local.sh --help              # Show help
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${ROOT_DIR}"

# 1. Activate virtual environment if present
if [ -d ".venv" ]; then
  # shellcheck disable=SC1091
  source .venv/bin/activate
fi

# 2. Source root .env if it exists
if [ -f ".env" ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

MODE="fastapi"
INPUT_KEY=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --adk)
      MODE="adk"
      shift
      ;;
    --cli)
      MODE="cli"
      shift
      ;;
    --ui|--fastapi)
      MODE="fastapi"
      shift
      ;;
    --key|--api-key)
      INPUT_KEY="$2"
      shift 2
      ;;
    -h|--help)
      echo "Food Rescue Surplus Broker — Local Development Runner"
      echo ""
      echo "Usage:"
      echo "  ./scripts/run_local.sh [OPTIONS] [GEMINI_API_KEY]"
      echo ""
      echo "Options:"
      echo "  --ui          Launch FastAPI interactive web UI (default: http://localhost:8000)"
      echo "  --adk         Launch Google ADK web interface (adk web)"
      echo "  --cli         Run standalone agent matching CLI"
      echo "  --key <KEY>   Pass Gemini API key directly"
      echo "  -h, --help    Show this help message"
      exit 0
      ;;
    *)
      if [[ -z "$INPUT_KEY" && ! "$1" =~ ^- ]]; then
        INPUT_KEY="$1"
      fi
      shift
      ;;
  esac
done

if [ -n "$INPUT_KEY" ]; then
  export GEMINI_API_KEY="$INPUT_KEY"
  export GOOGLE_API_KEY="$INPUT_KEY"
fi

if [ -n "$GEMINI_API_KEY" ] && [ -z "$GOOGLE_API_KEY" ]; then
  export GOOGLE_API_KEY="$GEMINI_API_KEY"
elif [ -n "$GOOGLE_API_KEY" ] && [ -z "$GEMINI_API_KEY" ]; then
  export GEMINI_API_KEY="$GOOGLE_API_KEY"
fi

echo "================================================================="
echo "🚐 Food Rescue Surplus Broker — Local Dev Environment"
echo "================================================================="
if [ -n "$GEMINI_API_KEY" ]; then
  KEY_MASKED="${GEMINI_API_KEY:0:6}...${GEMINI_API_KEY: -4}"
  echo "🔑 Gemini API Key: Configured (${KEY_MASKED})"
else
  echo "⚠️  No Gemini API Key detected."
  echo "   (You can pass it as: ./scripts/run_local.sh <API_KEY>, in .env, or in the web UI)"
fi
echo "🎯 Mode: ${MODE}"
echo "================================================================="

case "$MODE" in
  adk)
    echo "Starting Google ADK web interface..."
    adk web agent/
    ;;
  cli)
    echo "Running Agent CLI..."
    python -m agent.agent ${GEMINI_API_KEY:+--api-key "$GEMINI_API_KEY"}
    ;;
  fastapi)
    echo "Starting FastAPI app at http://localhost:8000 ..."
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    ;;
esac
