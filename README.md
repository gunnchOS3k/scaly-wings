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

## Games

| Game | Skills demonstrated |
|------|---------------------|
| **Flutter Flight** | Game loop, collision, cross-platform input |
| **Larva Leaf Race** | Local multiplayer, grid algorithms, timers |
| **Pupa Math Boost** | Data-driven math UI, balancing, progress |

## Portfolio features

- **About Yasmine** — editable `src/data/yasmineProfile.ts`
- **Portfolio** — projects including Scaly Wings + FINDS inspiration link
- **Publishing checklist** — iOS & Android summaries
- **Python recreation** — in-app summary + full guide in docs

## Local setup

```bash
git clone https://github.com/gunnchOS3k/scaly-wings.git
cd scaly-wings
npm install
npm run check    # verify docs & structure
npm run start    # Expo dev server
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

## Credits

- **Yasmine Dweir** — lead narrative, portfolio content, growth
- **gunnchOS3k MLV** — mentorship & technical foundation
- **Edmund Gunn, Jr.** — license holder

## License

MIT — see [LICENSE](LICENSE).
