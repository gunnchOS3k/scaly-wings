#!/usr/bin/env bash
# Install APK on Pixel 6a via USB and adb.
set -euo pipefail

APK_PATH="${1:-}"

echo "=== Scaly Wings — Install APK via USB (adb) ==="
echo ""
echo "Pixel 6a setup:"
echo "  Settings → About phone → tap Build number 7 times"
echo "  Settings → System → Developer options → USB debugging ON"
echo "  Connect USB-C cable → accept 'Allow USB debugging' on phone"
echo ""

if ! command -v adb >/dev/null 2>&1; then
  echo "✗ adb not found. Install Android platform-tools:"
  echo "  macOS: brew install android-platform-tools"
  exit 1
fi

echo "Connected devices:"
adb devices
echo ""

if [[ -z "$APK_PATH" ]]; then
  echo "Usage: bash scripts/07-install-android-apk-usb.sh path/to/scaly-wings.apk"
  echo ""
  echo "Download the APK from your EAS build page, then pass the file path."
  exit 1
fi

if [[ ! -f "$APK_PATH" ]]; then
  echo "✗ File not found: $APK_PATH"
  exit 1
fi

echo "Installing: $APK_PATH"
adb install -r "$APK_PATH"

echo ""
echo "✓ Install command sent. Check Pixel 6a for Scaly Wings icon."
echo ""
