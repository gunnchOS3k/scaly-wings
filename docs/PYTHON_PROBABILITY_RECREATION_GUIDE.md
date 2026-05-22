# Python Probability Recreation Guide

Map each Probability Wing game to Python. See also `docs/PYTHON_RECREATION_GUIDE.md` for general game loops.

## Setup

```bash
pip install numpy pandas matplotlib
```

## Weighted random symbol selection

```python
import random
symbols = ["rose", "lily", "vine", "moth", "dew", "seed"]
weights = [0.12, 0.18, 0.22, 0.20, 0.18, 0.10]
reels = random.choices(symbols, weights=weights, k=3)
```

## Expected value

```python
ev = sum(p(a,b,c) * reward(a,b,c) for a in symbols for b in symbols for c in symbols)
```

## Variance

```python
import numpy as np
rewards = [spin_once() for _ in range(1000)]
print(np.mean(rewards), np.var(rewards, ddof=1))
```

## Random walk

```python
pos = 0
for _ in range(200):
    pos += random.choice([-1, 1])
```

## Poisson arrivals

```python
import numpy as np
lam = 1.2
T = 10.0
count = np.random.poisson(lam * T)
```

## Exponential inter-arrival

```python
import numpy as np
wait = -np.log(np.random.rand()) / lam
```

## Noisy measurement

```python
X = np.random.normal(0, np.sqrt(sig_var))
Y = X + np.random.normal(0, np.sqrt(noise_var))
```

## Linear MMSE estimator

```python
a = sig_var / (sig_var + noise_var)
x_hat = a * Y
mse_theory = sig_var * (1 - a)
mse_sim = ((X - x_hat)**2).mean()
```

## pandas + matplotlib

```python
import pandas as pd
df = pd.DataFrame({"reward": rewards})
df["running_mean"] = df["reward"].expanding().mean()
df["running_mean"].plot(title="Law of large numbers")
```

## File mapping

| TypeScript | Python module |
|------------|---------------|
| `chanceGardenEngine.ts` | `chance_garden.py` |
| `noiseNectarEngine.ts` | `noise_nectar.py` |
| `poissonPondEngine.ts` | `poisson_pond.py` |
