# Scaly Wings — APK Install Checklist (Pixel 6a)

Print or follow this list when installing the **standalone** EAS APK.

## Before build

- [ ] Android package is `com.gunnchos3k.scalywings` (`app.json`)
- [ ] `eas.json` has `preview-apk` profile with `"buildType": "apk"`
- [ ] `eas-cli` installed: `npm install -g eas-cli`
- [ ] Logged into Expo: `eas login` (manual)
- [ ] Project linked: `npm run eas:configure` (first time)
- [ ] `npm install` completed in project root

## Before install

- [ ] Old debug/dev app uninstalled (`npm run android:uninstall` or `scripts/uninstall-debug-android.sh`)
- [ ] EAS APK build completed (`npm run android:apk`)
- [ ] EAS install link opened on Pixel 6a **or** APK downloaded to Mac
- [ ] Pixel allows install from browser/Files (unknown sources if prompted)
- [ ] If using USB: `adb devices` shows Pixel as `device` (not `unauthorized`)

## After install

- [ ] USB-C disconnected from Pixel
- [ ] Metro stopped on Mac (no `expo start` running)
- [ ] Scaly Wings opened from **home screen icon** (not Expo Go)
- [ ] No red “Unable to load script” screen
- [ ] App works on Pixel 6a independently (games load, navigation works)

## If verification fails

1. Run `bash scripts/check-android-build-mode.sh`
2. Uninstall again and reinstall **only** the EAS-built APK
3. Confirm the EAS build profile was `preview-apk`, not `development` or `production-android`

## Quick commands

```bash
cd /Users/gunnchos/Downloads/scaly-wings
npm run android:uninstall
npm run android:apk
```

Full guide: [PIXEL_6A_STANDALONE_APK_GUIDE.md](./PIXEL_6A_STANDALONE_APK_GUIDE.md)
