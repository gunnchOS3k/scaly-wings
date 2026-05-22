# Probability → Game Mechanics Map

| Course Topic | Game Mechanic | What Player Sees | What Yasmine Can Explain | Python/Data Extension |
|--------------|---------------|------------------|--------------------------|------------------------|
| Conditional Probability | Chance Garden outcome tables | P(pattern \| reel hint) | Updating odds after partial info | `pandas.crosstab` |
| Bayes' Theorem | Learning panel | Belief update narrative | Prior × likelihood / evidence | Manual Bayes demo |
| Independent Events | 3 reel spins | Each reel independent | Product of marginals | `random.choices` × 3 |
| Expected Value | EV per spin display | Theoretical vs running mean | E[R] = Σ p·r | Enumerate triples |
| Variance | Empirical variance panel | Streaky rewards | Spread around mean | `np.var` |
| PMF | Symbol table | Per-symbol P and payout | Discrete law | dict / Series |
| Gaussian RV | Noise Nectar | X, N, Y samples | PDF intuition | `np.random.normal` |
| Covariance / Correlation | Data panel | Corr(X,Y) changes with σ²n | Linear dependence | `np.cov` |
| MMSE | Auto-MMSE toggle | X̂ vs X, MSE | Linear optimal estimator | `a = σ²x/(σ²x+σ²n)` |
| Poisson Process | Poisson Pond λ sliders | Busier lanes | N(t) ~ Poisson(λT) | `np.random.poisson` |
| Exponential inter-arrival | Slow mode log | Δt between frogs | Memoryless waits | `-log(U)/λ` |
| Stochastic simulation | 100-crossing batch | Empirical success % | Monte Carlo vs theory | loop + counter |

Full syllabus list: `src/data/probabilityTopics.ts`
