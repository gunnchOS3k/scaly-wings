# Device Testing and Builds — Scaly Wings

Guide for **Edmund** and **Yasmine** to run Scaly Wings on real phones.

> Cursor cannot log into Expo or Apple for you. Steps marked **(manual)** require your accounts and approval prompts.

## 1. Quick decision guide

| Goal | Use this |
|------|----------|
| Fastest preview, QR code | **Expo Go** |
| Real installed app on **Pixel 6a** | **Android APK** (`preview-apk`) |
| Real installed app on **iPhones** before TestFlight | **iOS internal** (`preview-ios`) |
| Professional beta for portfolio / reviewers | **TestFlight** (`production-ios`) |

- **Expo Go** = development preview (not the store app).
- **APK** = Android install file (does **not** work on iPhone).
- **iOS internal** = signed build for **registered** device UDIDs only.
- **TestFlight** = Apple’s beta channel (requires App Store Connect).

---

## 2. Expo Go QR code testing

```bash
cd scaly-wings
npm install
npm run expo:go
```

Tunnel (different Wi-Fi / firewall issues):

```bash
npm run expo:go:tunnel
```

### Google Pixel 6a

1. Install **Expo Go** from Google Play.
2. Open Expo Go → **Scan QR code**.
3. Scan the QR in the terminal.

### Edmund's iPhone / Yasmine's iPhone

1. Install **Expo Go** from the App Store.
2. Run `npm run expo:go` on the Mac.
3. Scan QR with **Camera** or Expo Go.
4. Open the project when prompted.

### Troubleshooting

- Same Wi-Fi as the dev machine (or use `--tunnel`).
- Restart Expo Go.
- Clear Metro cache: `npx expo start -c`
- SDK mismatch: update Expo Go from the store.

---

## 3. Android APK for Google Pixel 6a

### One-time setup **(manual)**

```bash
npm install
npm install -g eas-cli
eas login
npm run eas:configure
```

`eas build:configure` links the repo to an EAS project (may add `extra.eas.projectId` to `app.json`).

### Build APK

```bash
npm run android:apk
# or: bash scripts/02-build-android-apk.sh
```

### Install on Pixel 6a

- Open the **EAS install link** on the phone, or
- Download APK → enable install from unknown sources if prompted, or
- USB: `bash scripts/07-install-android-apk-usb.sh path/to/app.apk`

### Pixel 6a USB debugging

1. Settings → About phone → tap **Build number** 7 times.
2. Settings → System → **Developer options** → **USB debugging** ON.
3. Connect USB-C → accept debugging prompt.
4. On Mac: `adb devices`
5. Install: `bash scripts/07-install-android-apk-usb.sh ./scaly-wings.apk`

---

## 4. iOS internal distribution (Edmund + Yasmine)

### Requirements **(manual)**

- Apple Developer Program
- Expo account (`eas login`)
- Each iPhone registered **before** the internal build

### Register devices

```bash
npm run ios:register-devices
# or: bash scripts/03-register-ios-devices.sh
```

Send the **registration link** to Edmund and Yasmine. Each opens it **on their iPhone**.

List devices:

```bash
npm run ios:devices
```

### Build internal iOS app

```bash
npm run ios:internal
# or: bash scripts/04-build-ios-internal.sh
```

Open the EAS install link on each registered iPhone → install → trust developer if asked.

### Important

If **Yasmine registers after** the build was made, run **`npm run ios:internal` again** so her device is included in the provisioning profile.

---

## 5. TestFlight path

### Requirements **(manual)**

- Apple Developer Program
- App Store Connect app for `com.gunnchos3k.scalywings`
- Privacy policy, screenshots, descriptions (before public release)

### Commands

```bash
npm run ios:testflight-build
npm run ios:submit
```

### Testers

1. Install **TestFlight** from the App Store.
2. Accept email invite or public link from App Store Connect.
3. Install **Scaly Wings**.

---

## 6. Build profiles explained

| Profile | Platform | Output | Who it is for |
|---------|----------|--------|----------------|
| `preview-apk` | Android | **APK** | Pixel 6a direct install |
| `preview-ios` | iOS | Signed **internal** IPA | Registered iPhones only |
| `production-ios` | iOS | App Store / **TestFlight** build | Broader beta |
| `production-android` | Android | **AAB** | Google Play (not APK) |
| `development` | Both | Dev client | Advanced native debugging |

See `eas.json` in the repo root.

---

## 7. Troubleshooting

| Problem | Try |
|---------|-----|
| QR won’t load | Same Wi-Fi or `npm run expo:go:tunnel` |
| `eas: command not found` | `npm install -g eas-cli` |
| Apple login failed | Use Apple ID with Developer access; check 2FA |
| iPhone not in build | Register device, then **rebuild** internal |
| APK won’t install | Unknown sources / Play Protect prompt |
| `adb unauthorized` | Revoke USB debugging auths on phone, replug |
| Bundle ID conflict | Use `com.gunnchos3k.scalywings` or change in app.json + Apple portal |
| Build fails on icons | Ensure `assets/images/icon.png` exists |

---

## Helper scripts

| Script | Purpose |
|--------|---------|
| `scripts/00-check-environment.sh` | Tooling check |
| `scripts/01-expo-go-qr.sh` | Expo Go QR |
| `scripts/02-build-android-apk.sh` | EAS APK |
| `scripts/03-register-ios-devices.sh` | Register iPhones |
| `scripts/04-build-ios-internal.sh` | Internal iOS build |
| `scripts/05-build-ios-testflight.sh` | TestFlight build |
| `scripts/06-submit-ios-testflight.sh` | Upload to ASC |
| `scripts/07-install-android-apk-usb.sh` | adb install |
| `scripts/scaly-wings-mobile-build-menu.sh` | Interactive menu |

Run menu: `npm run mobile:menu`
