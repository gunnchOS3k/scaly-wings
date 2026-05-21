# Scaly Wings — Recruiter Brief

## What it is

**Scaly Wings** is a cross-platform Expo (React Native + TypeScript) app: a butterfly-themed arcade with three playable games, a portfolio section for **Yasmine Dweir**, and publishing/documentation aimed at App Store and Play Store readiness. It is a **standalone repository** — not bundled with NASA/FINDS shark forecasting work.

## Why it is technically meaningful

- **Separated game engines** (`flutterFlightEngine.ts`, `larvaLeafRaceEngine.ts`, `pupaMathBoostEngine.ts`) from UI screens — interview-ready architecture.
- **Cross-platform input**: touch, keyboard (web), split-screen pads (mobile multiplayer).
- **Local persistence** via AsyncStorage for high scores and best times — no backend required for v1.
- **Data-driven content**: profile, portfolio, and math problems live in editable TypeScript data files.
- **Documentation set**: architecture, UML (Mermaid), GDD, store checklists, Python recreation path.

## What Yasmine can discuss in an interview

1. How the **game loop** updates state each frame and why UI reads immutable snapshots.
2. **Collision detection** for Flutter Flight gates vs. butterfly hitbox.
3. **Grid marking** algorithm for Larva Leaf Race and tie-breaking at timer end.
4. **Balancing** Pupa Math Boost: multiplier, progress bar, wrong-answer penalty.
5. Why she chose **Expo** for iOS, Android, and web from one codebase.
6. How she would **rebuild engines in Python** (pygame) using the recreation guide.

## Engineering skills visible

| Area | Evidence |
|------|----------|
| TypeScript | Strict types in engines and data models |
| Mobile UX | Large touch targets, SafeArea, mobile-first layouts |
| State management | Phase-based game states (start/playing/gameover) |
| Algorithms | Grid eat %, gate spawning, score clamping |
| Testing mindset | Health script + separated pure logic |
| Docs | UML, architecture, ATS keyword map |

## Product skills visible

- Portfolio storytelling (About + Projects pages)
- App store checklists (iOS + Android)
- Accessibility awareness (labels, contrast, motion notes in GDD)
- Placeholder content — honest, editable, not inflated claims

## Different from a tutorial clone

- Custom **metamorphosis** theme tied to a real portfolio narrative
- **Three distinct game genres** (arcade, local multiplayer, ed-tech math)
- **Recruiter docs** and Python learning path included by design
- **FINDS** referenced only as external inspiration — separate repo link
