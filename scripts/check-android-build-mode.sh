#!/usr/bin/env bash
# Explain debug/dev vs standalone EAS APK installs for Pixel 6a.
set -euo pipefail

cat <<'EOF'
=== Scaly Wings — Android build modes ===

DEV / DEBUG INSTALL (needs Metro, often needs USB or same Wi-Fi as Mac)
-----------------------------------------------------------------------
• How installed:  npx expo run:android   (npm run android:dev)
• APK artifact:   android/app/build/outputs/apk/debug/app-debug.apk
• JavaScript:     Loaded from Metro on your Mac (not fully bundled in APK)
• Symptom:        "Unable to load script. Make sure you're running Metro..."
                  after USB disconnect or when Metro is stopped
• Best for:       Active native debugging while coding

STANDALONE APK (works like a normal installed app)
--------------------------------------------------
• How installed:  eas build -p android --profile preview-apk
                  (npm run android:apk)
• Install:        EAS install link on phone, or adb install of downloaded APK
• JavaScript:     Bundled inside the APK (index.android.bundle embedded)
• Works:          After USB disconnect; Metro can be stopped
• Best for:       Edmund's Pixel 6a real-world testing without the Mac nearby

OTHER MODES
-----------
• Expo Go QR:     Fastest preview; uses Expo Go app + Metro; not standalone
• EAS AAB:        production-android profile — Google Play only, not sideload APK

Quick check on Pixel 6a:
  1. Stop Metro on Mac
  2. Unplug USB-C
  3. Open Scaly Wings from home screen
  4. If app runs → standalone APK
  5. If red Metro error → still on debug/dev build; uninstall and install EAS APK

Scripts:
  bash scripts/uninstall-debug-android.sh
  bash scripts/build-standalone-android-apk.sh
  bash scripts/scaly-wings-pixel6a-release-flow.sh

Docs:
  docs/PIXEL_6A_STANDALONE_APK_GUIDE.md
  docs/ANDROID_DEBUG_VS_STANDALONE.md
  docs/APK_INSTALL_CHECKLIST.md
EOF
