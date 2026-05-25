# Android: Debug vs Standalone Builds

Scaly Wings supports **fast dev workflows** and a **standalone install** for the Pixel 6a. They are not interchangeable.

## Comparison

| Mode | Command | Output | Needs Metro? | Needs USB? | Best for |
|------|---------|--------|--------------|------------|----------|
| Expo Go QR | `npm run expo:go` | Expo Go loads project | Yes | No (same Wi-Fi) | Fast previews, Edmund/Yasmine quick tests |
| Native debug | `npm run android:dev` / `npx expo run:android` | Installs debug app on device | **Yes** | Often for first install | Native modules, breakpoints, active coding |
| Local debug APK | `android/app/build/outputs/apk/debug/app-debug.apk` | Debug APK artifact | **Yes** | To sideload manually | **Not** the shareable standalone app |
| **EAS preview APK** | `npm run android:apk` | Cloud-built `.apk` | **No** | No after install | **Pixel 6a real install without Mac** |
| Google Play AAB | `npm run android:aab` | `.aab` for Play Console | No | No | Store submission, not direct APK sideload |

## How they differ

### Expo Go

- Scans QR from Metro.
- Runs inside the Expo Go shell.
- Great for fastest iteration; not a standalone Scaly Wings icon build.

### `npx expo run:android` (debug)

- Compiles native Android project locally.
- Debug variants **skip embedding** the JS bundle; the app loads from Metro.
- Symptom after unplugging USB: *Unable to load script…*

### `app-debug.apk`

- Output of a local debug Gradle build.
- Same Metro dependency as `expo run:android`.
- Treat as a **development artifact only**.

### EAS `preview-apk`

- Cloud build with `buildType: "apk"`.
- JavaScript is **packaged inside** the APK.
- Works after USB disconnect; Metro can be stopped.
- **This is the correct Pixel 6a installable app** for Edmund.

### `production-android` (AAB)

- Produces an Android App Bundle for Google Play.
- Not meant for direct sideload on Pixel 6a.

## Emergency local Android Studio route

Local **release** variants are possible with Android Studio (`assembleRelease`), but:

- You must manage keystore/signing yourself.
- Easy to confuse with debug builds.
- **EAS is the preferred path** for this repo unless EAS is unavailable.

Do not make local release the main workflow unless cloud builds are blocked.

## Scripts and checks

```bash
bash scripts/check-android-build-mode.sh
bash scripts/scaly-wings-pixel6a-release-flow.sh
```

## Package name

All installs use: `com.gunnchos3k.scalywings`

Uninstall before switching from debug to standalone:

```bash
npm run android:uninstall
```
