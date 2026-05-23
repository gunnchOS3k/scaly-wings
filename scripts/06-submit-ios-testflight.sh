#!/usr/bin/env bash
# Submit latest iOS production build to App Store Connect / TestFlight.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "=== Scaly Wings — Submit to TestFlight ==="
echo ""
echo "Uploads the latest production-ios EAS build to App Store Connect."
echo ""
echo "REQUIRES (manual):"
echo "  • Completed production-ios build"
echo "  • App Store Connect access"
echo "  • Apple ID / app-specific password or API key when EAS prompts"
echo ""
echo "After upload, Apple may take 15–60+ minutes to process the build."
echo "Then invite testers in App Store Connect → TestFlight."
echo ""
read -r -p "Continue with eas submit? [y/N] " ok
if [[ ! "$ok" =~ ^[Yy]$ ]]; then
  exit 0
fi

eas submit -p ios --profile production-ios

echo ""
echo "Invite Edmund and Yasmine in App Store Connect → TestFlight → Internal Testing."
echo "They install via the TestFlight app (not Expo Go)."
echo ""
