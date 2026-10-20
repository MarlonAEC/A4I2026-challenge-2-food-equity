#!/usr/bin/env bash
# ==============================================================================
# Food Rescue Surplus Broker — Google-Managed MCP Server Launcher
# ==============================================================================
# Downloads (once) and runs MCP Toolbox for Databases (googleapis/genai-toolbox),
# Google's own MCP server implementation, configured with its prebuilt BigQuery
# toolset (execute_sql, get_table_info, list_dataset_ids, list_table_ids, ...).
#
# agent/agent.py connects to this server via MCP_TOOLBOX_URL and loads its
# tools into the ADK agent's toolset alongside our own custom tools.
#
# Usage:
#   ./scripts/run_mcp_toolbox.sh                 # fetch binary if needed, then serve
#   ./scripts/run_mcp_toolbox.sh --port 5050     # custom port (default 5000)
#
# Requires Application Default Credentials with BigQuery access:
#   gcloud auth application-default login
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${ROOT_DIR}"

if [ -f ".env" ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

TOOLBOX_VERSION="${TOOLBOX_VERSION:-v1.1.0}"
# Default 5050, not 5000 — macOS Control Center / AirPlay Receiver squats on 5000.
PORT="${MCP_TOOLBOX_PORT:-5050}"
BIN_PATH="bin/toolbox"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --port) PORT="$2"; shift 2 ;;
    -h|--help)
      echo "Usage: ./scripts/run_mcp_toolbox.sh [--port <PORT>]"
      exit 0
      ;;
    *) shift ;;
  esac
done

if [ -z "${BIGQUERY_PROJECT:-}" ]; then
  export BIGQUERY_PROJECT="${GOOGLE_CLOUD_PROJECT:-qwiklabs-gcp-04-300332596f08}"
fi

if [ ! -x "${BIN_PATH}" ]; then
  OS_NAME="$(uname -s | tr '[:upper:]' '[:lower:]')"
  ARCH_NAME="$(uname -m)"
  case "${ARCH_NAME}" in
    arm64|aarch64) ARCH_NAME="arm64" ;;
    x86_64|amd64) ARCH_NAME="amd64" ;;
  esac
  URL="https://storage.googleapis.com/genai-toolbox/${TOOLBOX_VERSION}/${OS_NAME}/${ARCH_NAME}/toolbox"
  echo "⬇️  Fetching MCP Toolbox for Databases (${TOOLBOX_VERSION}, ${OS_NAME}/${ARCH_NAME})..."
  mkdir -p bin
  curl -sL --fail -o "${BIN_PATH}" "${URL}"
  chmod +x "${BIN_PATH}"
fi

echo "================================================================="
echo "🔌 MCP Toolbox for Databases — Google-Managed MCP Server"
echo "================================================================="
echo "   Project:  ${BIGQUERY_PROJECT}"
echo "   Port:     ${PORT}"
echo "   Config:   agent/mcp_tools.yaml (execute_sql, get_table_info, ...)"
echo "   Agent config: set MCP_TOOLBOX_URL=http://127.0.0.1:${PORT} in .env"
echo "================================================================="
echo "💡 If this fails with 'could not find default credentials', run:"
echo "     gcloud auth application-default login"
echo "================================================================="

exec "${BIN_PATH}" --config agent/mcp_tools.yaml --port "${PORT}"
