#!/usr/bin/env bash
# Remove debug/dev Scaly Wings so you do not open the Metro-dependent build by mistake.
set -euo pipefail

echo "=== Scaly Wings — Uninstall debug/dev app from Android device ==="
echo ""
echo "This removes the current debug/dev Scaly Wings app so you do not"
echo "accidentally open the Metro-dependent version."
echo ""

if ! command -v adb >/dev/null 2>&1; then
  echo "✗ adb not found. Install Android platform-tools:"
  echo "  macOS: brew install android-platform-tools"
  exit 1
fi

echo "Connected devices:"
adb devices
echo ""

PACKAGE="com.gunnchos3k.scalywings"
if adb uninstall "$PACKAGE" 2>/dev/null; then
  echo "✓ Uninstalled $PACKAGE"
else
  echo "ℹ Package $PACKAGE was not installed (or uninstall failed). Continuing."
fi

echo ""
echo "Next: build standalone APK with bash scripts/build-standalone-android-apk.sh"
echo "      or: npm run android:apk"
echo ""
