# Install Scaly Wings on Google Pixel 6a as a Real Standalone APK

Guide for **Edmund** — install Scaly Wings so it works like a normal app on the Pixel 6a, without keeping the Mac nearby.

## What is going wrong today?

If Scaly Wings was installed with:

```bash
npx expo run:android
# or: npm run android:dev
```

then the phone has a **debug/dev build**. That build expects JavaScript from **Metro** on your Mac. When you unplug USB-C or stop Metro, you may see:

> Unable to load script. Make sure you're running Metro or that your bundle index.android.bundle is packaged correctly for release.

**Fix:** build and install an **EAS preview APK** (`preview-apk` profile). That bundles JavaScript inside the APK.

## Before you start (one-time)

1. Install dependencies and EAS CLI on the Mac:

```bash
cd /Users/gunnchos/Downloads/scaly-wings
npm install
npm install -g eas-cli
```

2. **Log in to Expo manually** (Cursor cannot do this for you):

```bash
eas login
```

Follow the browser prompt with your Expo account.

3. Link the project to EAS (first time only):

```bash
npm run eas:configure
```

This may add an EAS project ID to `app.json`. Do not commit secrets; only the project ID is stored.

## Recommended build and install flow

### Step 1 — Remove the old debug app (optional but recommended)

With Pixel connected over USB and USB debugging enabled:

```bash
npm run android:devices
npm run android:uninstall
```

Or:

```bash
bash scripts/uninstall-debug-android.sh
```

### Step 2 — Build standalone APK in the cloud

```bash
npm run android:apk
```

Or the helper script (runs `npm install` first and checks login):

```bash
bash scripts/build-standalone-android-apk.sh
```

Wait for the EAS build to finish. Open the build URL from the terminal.

### Step 3 — Install on Pixel 6a

**Option A — EAS install link (easiest)**

1. On the Pixel 6a, open the **install link** from the EAS build page.
2. Allow install from browser if Android asks.
3. Tap Install.

**Option B — Download APK and install over USB**

1. Download the `.apk` from the EAS build page on the Mac.
2. Install via adb:

```bash
npm run android:devices
npm run android:uninstall
bash scripts/install-downloaded-apk-usb.sh /path/to/scaly-wings.apk
```

## Verification (standalone mode)

1. **Stop Metro** on the Mac (`Ctrl+C` in any `expo start` terminal).
2. **Disconnect USB-C** from the Pixel.
3. Optionally turn off Wi-Fi briefly to prove the app does not need the Mac.
4. Open **Scaly Wings** from the home screen icon.
5. **Success:** the app opens and games work.
6. **Failure:** red screen with “Unable to load script” — the debug/dev build is still installed. Uninstall and install the EAS APK again.

## Interactive menu

```bash
npm run pixel6a:apk-flow
```

## Troubleshooting

| Problem | What to do |
|---------|------------|
| `eas: command not found` | `npm install -g eas-cli` |
| Not logged into Expo | Run `eas login` manually |
| Pixel blocks APK install | Settings → Security → allow install from browser/Files |
| APK downloads but will not install | Uninstall old app first; confirm file ends in `.apk` not `.aab` |
| `adb: device unauthorized` | Unplug/replug USB; accept debugging prompt on Pixel |
| Wrong app / still Metro error | Uninstall `com.gunnchos3k.scalywings`, install EAS APK only |
| Same package name conflict | Only one Scaly Wings install; uninstall before reinstall |
| Build produced AAB not APK | Use profile `preview-apk`, not `production-android` |
| Metro port 8081 vs 8082 | Expo Go may use 8082; standalone APK does not use Metro at all |

## Emergency local release (not the main path)

Local Android Studio release builds are possible, but **EAS is preferred** for this project because it handles signing and produces a clean APK workflow. See [ANDROID_DEBUG_VS_STANDALONE.md](./ANDROID_DEBUG_VS_STANDALONE.md).

## Related docs

- [ANDROID_DEBUG_VS_STANDALONE.md](./ANDROID_DEBUG_VS_STANDALONE.md)
- [APK_INSTALL_CHECKLIST.md](./APK_INSTALL_CHECKLIST.md)
- [DEVICE_TESTING_AND_BUILDS.md](./DEVICE_TESTING_AND_BUILDS.md)
