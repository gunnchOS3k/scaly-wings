#!/usr/bin/env bash
# Build iOS production binary for TestFlight / App Store Connect.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "=== Scaly Wings — iOS TestFlight Candidate (production-ios) ==="
echo ""
echo "This build is for App Store Connect / TestFlight — not the same as internal ad hoc."
echo ""
echo "REQUIRES (manual):"
echo "  • Apple Developer Program"
echo "  • App Store Connect app record for com.gunnchos3k.scalywings"
echo "  • eas login + Apple credentials when prompted"
echo "  • Privacy policy, icons, screenshots (for full public release later)"
echo ""
read -r -p "Continue? [y/N] " ok
if [[ ! "$ok" =~ ^[Yy]$ ]]; then
  exit 0
fi

if [[ ! -d node_modules ]]; then
  npm install
fi

eas build -p ios --profile production-ios

echo ""
echo "Next: bash scripts/06-submit-ios-testflight.sh"
echo "See docs/IOS_TESTFLIGHT_PLAN.md"
echo ""
