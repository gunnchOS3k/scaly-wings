# Scaly Wings Architecture

## Overview

Scaly Wings uses **Expo Router** (file-based routes under `app/`) and feature code under `src/`.

```
app/           → screens & navigation (thin)
src/
  components/  → reusable UI
  games/       → engine + screen per game
  data/        → editable content
  theme/       → colors, typography, spacing
  utils/       → game loop, storage, scoring
docs/          → recruiter & store documentation
```

## Navigation

| Route | Purpose |
|-------|---------|
| `/` | Home hub |
| `/arcade` | Game list |
| `/games/*` | Individual games |
| `/about-yasmine` | Profile from `yasmineProfile.ts` |
| `/portfolio` | Projects from `portfolioProjects.ts` |
| `/publish` | Store checklist summary |
| `/python-recreation` | In-app summary + link to full doc |

Stack navigator configured in `app/_layout.tsx`.

## Game engines

Each game folder contains:

- `*Engine.ts` — pure logic (tick, collision, scoring)
- `*Screen.tsx` — React Native UI, input, loop wiring
- `types.ts` — shared interfaces

Engines do not import React — easier to port to Python.

## Data files

| File | Contents |
|------|----------|
| `yasmineProfile.ts` | Bio, resume bullets, links |
| `portfolioProjects.ts` | Project cards |
| `skills.ts` | Skill categories |
| `appStoreChecklist.ts` | iOS/Android checklist items |
| `mathProblems.ts` | Pupa Math Boost questions |

## Local storage

`src/utils/storage.ts` prefixes keys with `@scaly_wings:` and uses AsyncStorage.

Keys include high scores and best completion times per game.

## Platform targets

- **iOS / Android**: Expo Go or EAS builds (`app.json` bundle IDs)
- **Web**: `npm run web` — keyboard support for games
- **PWA**: Expo static web export when configured for production

## Adding a new game

1. Create `src/games/my-game/types.ts` and `myGameEngine.ts`
2. Create `MyGameScreen.tsx`
3. Add route `app/games/my-game.tsx`
4. Register card in `app/arcade.tsx`
5. Extend `scripts/check-project-health.js` paths
6. Update UML and GDD docs

## Accessibility

- Minimum 48px touch targets (`spacing.touchMin`)
- `accessibilityLabel` on mascot and buttons
- High contrast hot pink on cream backgrounds
- See GDD for reduced-motion notes
