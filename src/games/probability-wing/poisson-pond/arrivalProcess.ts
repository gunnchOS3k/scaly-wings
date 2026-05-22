/** Poisson process helpers: exponential inter-arrivals, count in interval. */

export function exponentialInterArrival(lambda: number): number {
  if (lambda <= 0) return Infinity;
  return -Math.log(Math.random()) / lambda;
}

export function poissonCount(lambda: number, intervalT: number): number {
  // Knuth algorithm for small rates, or use inverse transform via exponentials
  let count = 0;
  let t = 0;
  while (t < intervalT) {
    t += exponentialInterArrival(lambda);
    if (t < intervalT) count++;
  }
  return count;
}

export function scheduleArrivals(
  lane: number,
  lambda: number,
  horizon: number
): { time: number; interArrival: number }[] {
  const events: { time: number; interArrival: number }[] = [];
  let t = 0;
  while (t < horizon) {
    const ia = exponentialInterArrival(lambda);
    t += ia;
    if (t < horizon) events.push({ time: t, interArrival: ia });
  }
  return events;
}

export function empiricalRate(arrivals: number, intervalT: number): number {
  return intervalT > 0 ? arrivals / intervalT : 0;
}
