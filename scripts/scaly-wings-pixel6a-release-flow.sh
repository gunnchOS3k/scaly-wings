#!/usr/bin/env bash
# Beginner-friendly menu: Pixel 6a standalone APK workflow.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

show_menu() {
  echo ""
  echo "╔══════════════════════════════════════════════════╗"
  echo "║  Scaly Wings Pixel 6a Standalone APK Flow        ║"
  echo "╚══════════════════════════════════════════════════╝"
  echo ""
  echo "  1. Check Android devices with adb"
  echo "  2. Uninstall current debug/dev Scaly Wings from Pixel 6a"
  echo "  3. Build standalone EAS APK"
  echo "  4. Install downloaded APK over USB"
  echo "  5. Explain how to verify standalone mode"
  echo "  0. Exit"
  echo ""
}

while true; do
  show_menu
  read -r -p "Choose an option [0-5]: " choice
  case "$choice" in
    1)
      if command -v adb >/dev/null 2>&1; then
        adb devices
      else
        echo "✗ adb not found. Install: brew install android-platform-tools"
      fi
      ;;
    2)
      bash scripts/uninstall-debug-android.sh
      ;;
    3)
      bash scripts/build-standalone-android-apk.sh
      ;;
    4)
      read -r -p "Path to downloaded APK file: " apk
      bash scripts/install-downloaded-apk-usb.sh "$apk"
      ;;
    5)
      bash scripts/check-android-build-mode.sh
      ;;
    0)
      echo "Goodbye!"
      exit 0
      ;;
    *)
      echo "Invalid option."
      ;;
  esac
  echo ""
  read -r -p "Press Enter to continue..."
done
