# iOS App Store Readiness — Scaly Wings

## Prerequisites

- [ ] Apple Developer Program membership
- [ ] Mac with Xcode (for local simulator) or EAS cloud builds
- [ ] Expo / EAS CLI installed

## App identity

| Field | Value |
|-------|-------|
| App name | Scaly Wings |
| Bundle ID | `com.gunnchos3k.scalywings` |
| Slug | `scaly-wings` |

## Assets

- [ ] App icon 1024×1024 (no alpha)
- [ ] Splash screen (cream + hot pink; see `app.json`)
- [ ] Screenshots: 6.7" iPhone required; iPad if `supportsTablet` marketing applies

## Legal & privacy

- [ ] Privacy policy URL (describe local-only AsyncStorage scores)
- [ ] App Privacy questionnaire: no tracking in v1
- [ ] Age rating questionnaire (likely 4+)

## Store listing

- [ ] Subtitle & description emphasizing portfolio + educational games
- [ ] Keywords: butterfly, math, arcade, portfolio (no trademark violations)
- [ ] Support URL / marketing URL

## Build & test

```bash
npm install
npx eas build --platform ios
```

- [ ] TestFlight internal testing
- [ ] Test on physical iPhone (touch targets, safe areas)

## App Review notes

Explain: offline arcade, local scores only, educational math content, no account required.

## Release checklist

- [ ] Version bumped in `app.json`
- [ ] Release notes written
- [ ] Submit for review
- [ ] Monitor rejection feedback and iterate
