# Scaly Wings

**A Lepidoptera Lead Adventure** — created by **Yasmine Dweir** and **gunnchOS3k MLV**

> A butterfly arcade, math lab, and portfolio for Yasmine Dweir.

[![Repository](https://img.shields.io/badge/repo-standalone-hotpink)](PROJECT_INDEPENDENCE.md)
[![Expo](https://img.shields.io/badge/Expo-54-blue)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](tsconfig.json)

## Mission

Scaly Wings is a mobile-first, browser-playable, app-store-conscious butterfly arcade **and** professional portfolio foundation. It helps Yasmine show recruiters and professors that she can **build, explain, publish, document, and recreate** real cross-platform software — part of the “iron sharpens iron” summer.

**This repo is standalone.** It is not part of [FINDS: Sharks From Space](https://github.com/gunnchOS3k/finds_-shark-hotspot-forecaster). See [PROJECT_INDEPENDENCE.md](PROJECT_INDEPENDENCE.md).

## Why butterflies?

Metamorphosis mirrors learning: larva → pupa → butterfly. Hot pink, math, and curiosity are woven into every screen.

## Screenshots

_Placeholder — add captures to `assets/screenshots/` after running on device._

## Tech stack

- **Expo** + **React Native** + **TypeScript**
- **Expo Router** (file-based navigation)
- **AsyncStorage** (local high scores)
- **expo-linear-gradient**, **react-native-svg**

Targets: iOS · Android · Web (PWA-friendly export)

## Multilingual Scaly Wings

Scaly Wings supports **five languages** — a global, recruiter-ready feature for accessibility and cross-cultural design.

| Language | Code | Why it matters |
|----------|------|----------------|
| English | `en` | Source language |
| Arabic | `ar` | Yasmine — RTL layout support |
| French | `fr` | Yasmine |
| Spanish | `es` | Edmund |
| Finnish | `fi` | Edmund (learning) |

**Switch language:** Home screen (top) or **Settings → Language**. Preference persists across restarts. Device locale is used when no manual choice is saved.

```bash
npm run i18n:check    # validate locale JSON + key parity
npm run expo:go       # test live switching
```

Docs:

- [docs/LOCALIZATION_GUIDE.md](docs/LOCALIZATION_GUIDE.md)
- [docs/ARABIC_RTL_SUPPORT.md](docs/ARABIC_RTL_SUPPORT.md)
- [docs/TRANSLATION_REVIEW_WORKFLOW.md](docs/TRANSLATION_REVIEW_WORKFLOW.md)
- [docs/LANGUAGE_PORTFOLIO_STORY.md](docs/LANGUAGE_PORTFOLIO_STORY.md)

Draft translations need human review — see workflow doc. Arabic may prompt an app restart for full RTL layout.

## Games

| Game | Skills demonstrated |
|------|---------------------|
| **Flutter Flight** | Game loop, collision, cross-platform input |
| **Larva Leaf Race** | Local multiplayer, grid algorithms, timers |
| **Pupa Math Boost** | Data-driven math UI, balancing, progress |
| **Scaly Wings Pinball** | Ball physics, flippers, bumpers, scoring |
| **Wing Run: Nectar Valley** | Side-scroller, camera, platforms, math gates |

## Cocoon Console Mode

Handheld · tabletop · **big screen** (when OS supports mirroring/HDMI) · PS5/Xbox on **web** via Gamepad API.

- Route: `/cocoon-console`
- Controller test: `/controller-test`
- Settings: `/settings`

See [docs/COCOON_CONSOLE_MODE.md](docs/COCOON_CONSOLE_MODE.md) · [docs/CONTROLLER_SUPPORT.md](docs/CONTROLLER_SUPPORT.md)

## Probability Wing

**Probability Wing: Chance, Noise & Stochastic Flight** — educational labs for Probability & Stochastic Processes (fictional pollen/nectar only; no real-money gambling).

| Mini-game | Math concepts |
|-----------|----------------|
| **Butterfly Chance Garden** | PMF, independence, E[R], variance, law of large numbers |
| **Noise Nectar Rescue** | Noisy observations, MMSE, MSE, correlation |
| **Poisson Pond Crossing** | Poisson arrivals, exponential inter-arrivals, simulation |

Docs: [PROBABILITY_WING_DESIGN.md](docs/PROBABILITY_WING_DESIGN.md) · [PYTHON_PROBABILITY_RECREATION_GUIDE.md](docs/PYTHON_PROBABILITY_RECREATION_GUIDE.md)

## Portfolio features

- **About Yasmine** — editable `src/data/yasmineProfile.ts`
- **Portfolio** — projects including Scaly Wings + FINDS inspiration link
- **Publishing checklist** — iOS & Android summaries
- **Python recreation** — in-app summary + full guide in docs

## Pixel 6a Standalone APK

Use **Expo Go** or **local debug** builds while actively developing on the Mac. Use the **EAS preview APK** when you want Scaly Wings on Edmund’s Pixel 6a to behave like a normal installed app — **no USB-C, no Metro, Mac can be away**.

| Goal | Command |
|------|---------|
| Fast dev preview (Expo Go) | `npm run expo:go` |
| Native debug on device (needs Metro) | `npm run android:dev` |
| **Standalone APK** (Pixel 6a, no Metro) | `npm run android:apk` |
| Interactive Pixel 6a flow | `npm run pixel6a:apk-flow` |

- `android:dev` may show *Unable to load script* after unplugging USB — that is expected for debug builds.
- `android:apk` uses EAS cloud build profile `preview-apk`; JavaScript is bundled inside the APK.

Guides:

- [docs/PIXEL_6A_STANDALONE_APK_GUIDE.md](docs/PIXEL_6A_STANDALONE_APK_GUIDE.md)
- [docs/ANDROID_DEBUG_VS_STANDALONE.md](docs/ANDROID_DEBUG_VS_STANDALONE.md)
- [docs/APK_INSTALL_CHECKLIST.md](docs/APK_INSTALL_CHECKLIST.md)

## Run and install on real devices

For **Edmund’s Pixel 6a**, **Edmund’s iPhone**, and **Yasmine’s iPhone**:

| Goal | Command |
|------|---------|
| **Expo Go QR** (fastest) | `npm run expo:go` |
| Expo Go (tunnel / different Wi-Fi) | `npm run expo:go:tunnel` |
| Native Android debug (Metro) | `npm run android:dev` |
| **Android APK** (Pixel 6a standalone) | `npm run android:apk` |
| Register iPhones (iOS internal) | `npm run ios:register-devices` |
| **Signed iOS internal app** | `npm run ios:internal` |
| TestFlight candidate build | `npm run ios:testflight-build` |
| Submit to TestFlight | `npm run ios:submit` |
| Interactive menu | `npm run mobile:menu` |

**First-time EAS setup (manual):** `npm install -g eas-cli` → `eas login` → `npm run eas:configure`

Full guides:

- [docs/PIXEL_6A_STANDALONE_APK_GUIDE.md](docs/PIXEL_6A_STANDALONE_APK_GUIDE.md) — Edmund Pixel 6a standalone install
- [docs/ANDROID_DEBUG_VS_STANDALONE.md](docs/ANDROID_DEBUG_VS_STANDALONE.md) — debug vs EAS APK
- [docs/APK_INSTALL_CHECKLIST.md](docs/APK_INSTALL_CHECKLIST.md) — printable checklist
- [docs/DEVICE_TESTING_AND_BUILDS.md](docs/DEVICE_TESTING_AND_BUILDS.md) — main walkthrough
- [docs/ANDROID_APK_PLAN.md](docs/ANDROID_APK_PLAN.md) — Pixel 6a APK
- [docs/IOS_TESTFLIGHT_PLAN.md](docs/IOS_TESTFLIGHT_PLAN.md) — TestFlight path
- [docs/BUILD_OUTPUT_CHECKLIST.md](docs/BUILD_OUTPUT_CHECKLIST.md) — printable checklist

## Local setup

```bash
git clone https://github.com/gunnchOS3k/scaly-wings.git
cd scaly-wings
npm install
npm run check    # verify docs & structure
npm run start    # Expo dev server (same as npm run expo:go)
```

| Command | Action |
|---------|--------|
| `npm run web` | Browser |
| `npm run ios` | iOS simulator |
| `npm run android` | Android emulator |
| `npm run lint` | Lint (if configured) |

## Publishing roadmap

1. Customize icons in `assets/images/`
2. Follow [docs/APP_STORE_READINESS.md](docs/APP_STORE_READINESS.md)
3. Follow [docs/ANDROID_PLAY_STORE_READINESS.md](docs/ANDROID_PLAY_STORE_READINESS.md)
4. `npx eas build` when ready (EAS account required; no paid deps for local dev)

## Python recreation roadmap

See [docs/PYTHON_RECREATION_GUIDE.md](docs/PYTHON_RECREATION_GUIDE.md) — 4-week path from classes → pygame → analytics.

## Documentation

| Doc | Audience |
|-----|----------|
| [README_FOR_RECRUITERS.md](docs/README_FOR_RECRUITERS.md) | Hiring managers |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Engineers |
| [GAME_DESIGN_DOCUMENT.md](docs/GAME_DESIGN_DOCUMENT.md) | Design / QA |
| [UML_CLASS_DIAGRAM.md](docs/UML_CLASS_DIAGRAM.md) | Technical interviews |
| [YASMINE_LEARNING_PATH.md](docs/YASMINE_LEARNING_PATH.md) | Yasmine |
| [ATS_RESUME_KEYWORDS.md](docs/ATS_RESUME_KEYWORDS.md) | Resume tuning |
| [PROBABILITY_WING_DESIGN.md](docs/PROBABILITY_WING_DESIGN.md) | Probability wing overview |
| [YASMINE_PROBABILITY_INTERVIEW_PREP.md](docs/YASMINE_PROBABILITY_INTERVIEW_PREP.md) | Interview practice |
| [PINBALL_GAME_DESIGN.md](docs/PINBALL_GAME_DESIGN.md) | Pinball |
| [WING_RUN_SIDE_SCROLLER_DESIGN.md](docs/WING_RUN_SIDE_SCROLLER_DESIGN.md) | Platformer |
| [INPUT_ARCHITECTURE.md](docs/INPUT_ARCHITECTURE.md) | Input layer |
| [BIG_SCREEN_PLAYBOOK.md](docs/BIG_SCREEN_PLAYBOOK.md) | HDMI / cast |

## Testing checklist

**Phone:** iPhone/Android portrait & landscape · touch zones

**Web:** Chrome keyboard · Chrome gamepad (`/controller-test`)

**Controllers:** PS5 Bluetooth · Xbox Bluetooth/USB · map L1/R1 flippers in Pinball

**Games:** Flutter Flight · Larva 2P · Pinball · Wing Run · Cocoon Console

**Big screen:** Android HDMI if supported · AirPlay/mirror · landscape readability

## Credits

- **Yasmine Dweir** — lead narrative, portfolio content, growth
- **gunnchOS3k MLV** — mentorship & technical foundation
- **Edmund Gunn, Jr.** — license holder

## License

MIT — see [LICENSE](LICENSE).
