#!/usr/bin/env bash
# Build standalone Android APK for Pixel 6a (delegates to build-standalone-android-apk.sh).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "=== Scaly Wings — Android APK (preview-apk) ==="
echo ""
echo "This builds a STANDALONE APK (not app-debug.apk)."
echo "See docs/PIXEL_6A_STANDALONE_APK_GUIDE.md"
echo ""
echo "First-time setup (manual):"
echo "  npm install -g eas-cli"
echo "  eas login"
echo "  npm run eas:configure"
echo ""

bash scripts/build-standalone-android-apk.sh
