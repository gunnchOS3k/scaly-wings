# Android APK Plan — Pixel 6a

## Why APK matters

An **APK** installs Scaly Wings like a normal app on Edmund’s **Google Pixel 6a** — no Expo Go required. Good for demos and offline-feeling tests.

## APK vs AAB

| Format | Profile | Use |
|--------|---------|-----|
| **APK** | `preview-apk` | Direct sideload / EAS install link |
| **AAB** | `production-android` | **Google Play** upload only |

## Build **(manual login to Expo)**

```bash
npm install -g eas-cli
eas login
npm run eas:configure
npm run android:apk
```

## Pixel 6a install (EAS link)

1. Open build URL from terminal on the phone.
2. Download / install when prompted.
3. Allow install if Android warns about unknown sources.

## USB install

```bash
adb devices
bash scripts/07-install-android-apk-usb.sh ~/Downloads/scaly-wings.apk
```

## Safe sharing

Only share APKs with **trusted testers** during development. Do not post public download links until ready for release.

## Future Google Play path

```bash
npm run android:aab
# Upload AAB in Google Play Console
```

See `docs/APP_STORE_READINESS.md` and `docs/ANDROID_PLAY_STORE_READINESS.md`.
