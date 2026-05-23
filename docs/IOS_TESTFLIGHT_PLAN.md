# iOS TestFlight Plan — Scaly Wings

## Why TestFlight matters

TestFlight is Apple’s official beta channel. For Yasmine’s portfolio, it shows you can ship through **App Store Connect**, not only Expo Go.

## Expo Go vs internal vs TestFlight

| Method | Install | Apple review for testers |
|--------|---------|---------------------------|
| Expo Go | Dev preview | No |
| Internal (`preview-ios`) | Registered UDIDs | No TestFlight |
| TestFlight | Invite link | Build processing + beta rules |

## Requirements **(manual — not in repo)**

- [ ] Apple Developer Program active ($99/year)
- [ ] Expo account + `eas login`
- [ ] App Store Connect → **My Apps** → create **Scaly Wings**
- [ ] Bundle ID: `com.gunnchos3k.scalywings`

## App Store Connect checklist

- [ ] App name, subtitle, category
- [ ] Privacy policy URL
- [ ] App Privacy questionnaire
- [ ] Screenshots (6.7" iPhone minimum)
- [ ] App icon 1024×1024 (we have `assets/images/icon.png` — verify quality)
- [ ] Age rating questionnaire

## Internal vs external testers

- **Internal** (up to 100 ASC users): fast, good for Edmund + Yasmine team.
- **External**: requires Beta App Review for first build.

## Yasmine tester flow

1. Edmund submits build: `npm run ios:submit`
2. Edmund adds Yasmine email in TestFlight → Internal Testing
3. Yasmine installs **TestFlight**, accepts invite, installs Scaly Wings

## Edmund tester flow

Same as above — use TestFlight app, not Expo Go.

## Commands

```bash
npm run ios:testflight-build
npm run ios:submit
```

## What not to do yet

- Do **not** submit for **public App Store release** until privacy policy, final screenshots, and review notes are ready.
- Do **not** share internal provisioning profiles publicly.

## Credentials note

This repo does **not** contain Apple API keys, passwords, or device UDIDs. EAS will prompt during build/submit.
