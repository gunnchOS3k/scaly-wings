#!/usr/bin/env bash
# Build standalone Scaly Wings APK via EAS (preview-apk). Not app-debug.apk.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "=== Scaly Wings — Standalone Android APK (EAS) ==="
echo ""
echo "This builds the standalone APK version of Scaly Wings."
echo "This is different from android/app/build/outputs/apk/debug/app-debug.apk."
echo "The APK produced by EAS should work without USB-C and without Metro."
echo ""

if [[ ! -f package.json ]]; then
  echo "✗ package.json not found. Run this script from the scaly-wings project root."
  exit 1
fi

if [[ ! -f eas.json ]]; then
  echo "✗ eas.json not found. Run: npm run eas:configure"
  exit 1
fi

if ! command -v eas >/dev/null 2>&1; then
  echo "✗ eas-cli not found."
  echo "  Install: npm install -g eas-cli"
  echo "  Then log in manually: eas login"
  exit 1
fi

if ! eas whoami >/dev/null 2>&1; then
  echo "⚠ You are not logged into Expo."
  echo "  Run manually: eas login"
  echo "  Then re-run: bash scripts/build-standalone-android-apk.sh"
  exit 1
fi

echo "Installing npm dependencies..."
npm install

echo ""
echo "Starting EAS cloud build (profile: preview-apk)..."
echo "Monitor progress in the terminal URL or at https://expo.dev"
echo ""

eas build -p android --profile preview-apk

echo ""
echo "=== Build submitted / finished ==="
echo "Open the EAS install link on the Pixel 6a, or download the APK and install it manually."
echo "  USB install: bash scripts/install-downloaded-apk-usb.sh /path/to/scaly-wings.apk"
echo ""
