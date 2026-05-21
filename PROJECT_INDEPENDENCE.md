# Scaly Wings — Standalone Repository

**Scaly Wings** (`gunnchOS3k/scaly-wings`) is its **own Git repository**. It is **not** a submodule, monorepo package, or folder inside FINDS: Sharks From Space or any other project.

## Separation guarantees

| Item | Scaly Wings | FINDS (separate repo) |
|------|-------------|------------------------|
| Git remote | `github.com/gunnchOS3k/scaly-wings` | `github.com/gunnchOS3k/finds_-shark-hotspot-forecaster` |
| Bundle ID | `com.gunnchos3k.scalywings` | Different app identity |
| Dependencies | Own `package.json` | Own stack |
| Code import | None — no shared source tree | None |

The portfolio page may **mention** FINDS as inspiration or collaboration with an external link only. No FINDS code is copied into this repo.

## If you cloned into the wrong folder

```bash
cd ~/Downloads
git clone https://github.com/gunnchOS3k/scaly-wings.git
cd scaly-wings
npm install
npm run start
```

Do **not** nest `scaly-wings` inside `finds_-shark-hotspot-forecaster/`.
