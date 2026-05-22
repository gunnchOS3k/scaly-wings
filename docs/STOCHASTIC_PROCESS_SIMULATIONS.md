# Stochastic Process Simulations in Scaly Wings

## Random number generation

All games use `Math.random()` (web/native). Python recreation uses `random` / `numpy.random`.

## Discrete random variables

- **Chance Garden**: finite symbol set with PMF on each reel
- **Poisson counts**: `poissonCount` via sum of exponential waits

## Continuous random variables

- **Noise Nectar**: Gaussian X and N via Box-Muller in `estimation.ts`

## Random walks

Extension: butterfly position += noise step each frame (links to Wiener process topic).

## Poisson arrivals

`scheduleArrivals(lane, λ, horizon)` stacks exponential inter-arrivals until horizon T.

## Noisy observations

Y = X + N with independent Gaussians; compare player guess vs MMSE X̂.

## MSE

Running MSE = (1/n) Σ (X − X̂)² compared to theoretical MMSE σ²x(1−a).

## Simulation vs exact formula

| Quantity | Exact | Simulated |
|----------|-------|-----------|
| E[R] spin | Enumerate 6³ triples | Mean of N spin rewards |
| MMSE | σ²x(1−a) | Mean squared error of samples |
| Poisson rate | λ | arrivals / T |

## Comparing theory and experiment

Use in-app **Data Panel** and batch buttons (10 / 100 / 1000 spins or 100 crossings).
