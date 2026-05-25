#!/usr/bin/env bash
# Install EAS-built APK on Pixel 6a via USB (adb).
set -euo pipefail

APK_PATH="${1:-}"

echo "=== Scaly Wings — Install downloaded APK via USB ==="
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
  echo "Usage: bash scripts/install-downloaded-apk-usb.sh /path/to/scaly-wings.apk"
  exit 1
fi

if [[ ! -f "$APK_PATH" ]]; then
  echo "✗ File not found: $APK_PATH"
  exit 1
fi

echo "Installing: $APK_PATH"
adb install -r "$APK_PATH"

echo ""
echo "After install, disconnect USB-C, stop Metro, and open Scaly Wings."
echo "It should work without the Mac."
echo ""
