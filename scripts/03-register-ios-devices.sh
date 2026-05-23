#!/usr/bin/env bash
# Register iPhones for iOS internal (ad hoc) distribution.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "=== Scaly Wings — Register iPhones for iOS Internal Builds ==="
echo ""
echo "Registers device UDIDs with EAS/Apple for internal distribution."
echo ""
echo "REQUIRES (manual):"
echo "  • Apple Developer Program membership (\$99/year)"
echo "  • eas login"
echo "  • Each tester opens the registration link ON THEIR iPhone"
echo ""
echo "Register:"
echo "  • Edmund's iPhone"
echo "  • Yasmine's iPhone"
echo ""
echo "After BOTH devices are registered, run:"
echo "  bash scripts/04-build-ios-internal.sh"
echo ""
read -r -p "Continue with eas device:create? [y/N] " ok
if [[ ! "$ok" =~ ^[Yy]$ ]]; then
  exit 0
fi

if ! command -v eas >/dev/null 2>&1; then
  echo "Install EAS CLI: npm install -g eas-cli"
  exit 1
fi

eas device:create

echo ""
echo "Send the registration URL to anyone who needs Scaly Wings on iPhone."
echo "List registered devices: npm run ios:devices"
echo ""
