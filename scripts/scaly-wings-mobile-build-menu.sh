#!/usr/bin/env bash
# Interactive menu for Scaly Wings mobile testing and EAS builds.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

show_menu() {
  echo ""
  echo "╔══════════════════════════════════════╗"
  echo "║   Scaly Wings Mobile Build Menu      ║"
  echo "╚══════════════════════════════════════╝"
  echo ""
  echo "  1. Check environment"
  echo "  2. Start Expo Go QR code (LAN)"
  echo "  3. Start Expo Go QR code (tunnel)"
  echo "  4. Build Android APK for Pixel 6a"
  echo "  5. Register iPhones for iOS internal"
  echo "  6. Build signed iOS internal app"
  echo "  7. Build iOS TestFlight candidate"
  echo "  8. Submit iOS build to TestFlight"
  echo "  9. Install Android APK over USB (adb)"
  echo "  0. Exit"
  echo ""
}

while true; do
  show_menu
  read -r -p "Choose an option [0-9]: " choice
  case "$choice" in
    1) bash scripts/00-check-environment.sh ;;
    2) bash scripts/01-expo-go-qr.sh ;;
    3) bash scripts/01-expo-go-qr.sh --tunnel ;;
    4) bash scripts/02-build-android-apk.sh ;;
    5) bash scripts/03-register-ios-devices.sh ;;
    6) bash scripts/04-build-ios-internal.sh ;;
    7) bash scripts/05-build-ios-testflight.sh ;;
    8) bash scripts/06-submit-ios-testflight.sh ;;
    9)
      read -r -p "Path to APK file: " apk
      bash scripts/07-install-android-apk-usb.sh "$apk"
      ;;
    0)
      echo "Goodbye!"
      exit 0
      ;;
    *)
      echo "Invalid option."
      ;;
  esac
  read -r -p "Press Enter to continue..."
done
