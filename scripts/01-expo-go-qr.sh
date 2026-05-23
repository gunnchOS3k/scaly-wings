#!/usr/bin/env bash
# Start Expo dev server and show QR code for Expo Go.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

USE_TUNNEL=0
if [[ "${1:-}" == "--tunnel" ]]; then
  USE_TUNNEL=1
fi

echo "=== Scaly Wings — Expo Go QR Code ==="
echo ""
echo "BEFORE YOU START:"
echo "  • Install Expo Go on each test phone (Google Play / App Store)."
echo "  • Phones should be on the same Wi-Fi as this computer (unless using --tunnel)."
echo ""
echo "Google Pixel 6a:"
echo "  1. Open Expo Go"
echo "  2. Tap 'Scan QR code'"
echo "  3. Scan the QR code shown in this terminal"
echo ""
echo "Edmund's iPhone / Yasmine's iPhone:"
echo "  1. Install Expo Go"
echo "  2. Scan the QR with the Camera app OR Expo Go's scanner"
echo "  3. Open the project when prompted"
echo ""
echo "If LAN fails, run: npm run expo:go:tunnel"
echo "  (or: bash scripts/01-expo-go-qr.sh --tunnel)"
echo ""

if [[ ! -d node_modules ]]; then
  echo "Installing dependencies..."
  npm install
fi

if [[ $USE_TUNNEL -eq 1 ]]; then
  echo "Starting with tunnel (slower, works across networks)..."
  exec npx expo start --tunnel
else
  echo "Starting Expo (LAN)..."
  exec npx expo start
fi
