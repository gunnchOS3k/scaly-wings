#!/usr/bin/env bash
# Build Android APK for Google Pixel 6a via EAS.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "=== Scaly Wings — Android APK (preview-apk) ==="
echo ""
echo "This creates an installable APK for Edmund's Pixel 6a (and other Android testers)."
echo ""
echo "YOU MUST DO THESE FIRST (manual — Cursor cannot do them for you):"
echo "  1. npm install -g eas-cli"
echo "  2. eas login          (Expo account — browser prompt)"
echo "  3. npm run eas:configure   (links project; may create EAS project ID in app.json)"
echo ""
read -r -p "Have you completed eas login and eas:configure? [y/N] " ok
if [[ ! "$ok" =~ ^[Yy]$ ]]; then
  echo "Complete setup first, then re-run this script."
  exit 1
fi

if [[ ! -d node_modules ]]; then
  npm install
fi

echo ""
echo "Starting EAS build: eas build -p android --profile preview-apk"
echo "This runs in the cloud. Follow the URL to monitor progress."
echo ""

eas build -p android --profile preview-apk

echo ""
echo "=== After build completes ==="
echo "  • Open the EAS install link on your Pixel 6a and install Scaly Wings"
echo "  • Or download the APK and run:"
echo "      bash scripts/07-install-android-apk-usb.sh path/to/downloaded.apk"
echo "  • You may need to allow 'Install unknown apps' for the browser/files app"
echo ""
