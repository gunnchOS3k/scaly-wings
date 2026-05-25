#!/usr/bin/env bash
# Install EAS-built APK on Pixel 6a via USB (delegates to install-downloaded-apk-usb.sh).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
exec bash "$ROOT/scripts/install-downloaded-apk-usb.sh" "$@"
