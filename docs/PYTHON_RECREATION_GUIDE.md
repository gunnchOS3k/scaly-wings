# Python Recreation Guide — Scaly Wings

Yasmine: this guide maps every TypeScript game engine in Scaly Wings to Python so you can **rebuild and own** the logic.

## Philosophy

Keep the same separation as the app:

- **Engine** = classes + functions (no GUI inside)
- **UI** = pygame window or tkinter widgets that call the engine

## 1. Game loop in Python

```python
import time

class GameLoop:
    def __init__(self, on_tick):
        self.on_tick = on_tick
        self.running = False

    def start(self):
        self.running = True
        last = time.perf_counter()
        while self.running:
            now = time.perf_counter()
            delta_ms = (now - last) * 1000
            last = now
            self.on_tick(min(delta_ms, 50))
            time.sleep(1 / 60)

    def stop(self):
        self.running = False
```

Mirror: `src/utils/gameLoop.ts`

## 2. Butterfly object (Flutter Flight)

```python
@dataclass
class Butterfly:
    y: float
    velocity: float

    def flap(self):
        self.velocity = -8

    def apply_gravity(self, g=0.45):
        self.velocity += g
        self.y += self.velocity
```

## 3. Gates / obstacles

```python
@dataclass
class Gate:
    x: float
    gap_y: float
    gap_height: float
    passed: bool = False

    def move(self, speed=3):
        self.x -= speed
```

Collision: check butterfly bounding box against top stem and bottom stem rectangles.

## 4. Larva & leaf grid

```python
class LeafGrid:
    def __init__(self, cols, rows):
        self.eaten = [[False] * cols for _ in range(rows)]

    def eat(self, row, col):
        if not self.eaten[row][col]:
            self.eaten[row][col] = True
            return True
        return False

    def percent_eaten(self):
        total = len(self.eaten) * len(self.eaten[0])
        eaten = sum(cell for row in self.eaten for cell in row)
        return round(100 * eaten / total)
```

## 5. Math problems as dictionaries

```python
problem = {
    "id": "e1",
    "prompt": "7 + 5 = ?",
    "answer": 12,
    "difficulty": "easy",
    "category": "arithmetic",
}
```

Or use `@dataclass` for type hints. Source: `src/games/pupa-math-boost/mathProblems.ts`

## 6. Scoring & save files

```python
import json
from pathlib import Path

SAVE_PATH = Path.home() / ".scaly_wings_scores.json"

def load_scores():
    if SAVE_PATH.exists():
        return json.loads(SAVE_PATH.read_text())
    return {}

def save_score(key, value):
    data = load_scores()
    data[key] = value
    SAVE_PATH.write_text(json.dumps(data, indent=2))
```

## Recommended libraries

| Library | Use |
|---------|-----|
| **pygame** | Flutter Flight & Larva Race graphics + input |
| **tkinter** | Simple forms for math game (stdlib) |
| **pandas** | Log each round: score, time, accuracy |
| **matplotlib** | Chart progress over the summer |

## 4-week learning path

### Week 1 — Classes & objects
- Recreate `Butterfly`, `Gate`, `Larva`, `MathProblem` as classes
- Write unit tests with `assert` (no GUI)

### Week 2 — Flutter Flight in pygame
- Window, flap on space, draw rectangles for gates
- Save high score to JSON

### Week 3 — Larva Leaf Race
- 2D grid, two keyboard players, timer
- Print winner and % eaten

### Week 4 — Pupa Math Boost + analytics
- Load questions from JSON
- Track multiplier and progress bar in pygame or tkinter
- Export session log to CSV and plot with matplotlib

## Mapping from repo files

| TypeScript | Python target |
|------------|---------------|
| `flutterFlightEngine.ts` | `flutter_flight/engine.py` |
| `larvaLeafRaceEngine.ts` | `larva_race/engine.py` |
| `pupaMathBoostEngine.ts` | `pupa_math/engine.py` |
| `storage.ts` | `scores.py` |

You do not need to match React UI — only **behavior**.
