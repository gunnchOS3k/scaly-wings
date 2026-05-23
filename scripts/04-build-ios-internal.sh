#!/usr/bin/env bash
# Build signed iOS internal distribution for registered iPhones.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "=== Scaly Wings — iOS Internal Build (preview-ios) ==="
echo ""
echo "Creates a signed build installable on registered iPhones only."
echo ""
echo "REQUIRES (manual):"
echo "  • Apple Developer Program"
echo "  • eas login + eas build:configure"
echo "  • Edmund's iPhone registered (eas device:create)"
echo "  • Yasmine's iPhone registered BEFORE this build"
echo ""
echo "IMPORTANT:"
echo "  If Yasmine registers AFTER this build, you must REBUILD."
echo "  Internal builds only include devices registered at build time."
echo ""
read -r -p "Are all iPhones registered? [y/N] " ok
if [[ ! "$ok" =~ ^[Yy]$ ]]; then
  echo "Run: bash scripts/03-register-ios-devices.sh"
  exit 1
fi

if [[ ! -d node_modules ]]; then
  npm install
fi

eas build -p ios --profile preview-ios

echo ""
echo "When complete, open the EAS install link on each registered iPhone."
echo "Settings may ask you to trust the developer profile."
echo ""
