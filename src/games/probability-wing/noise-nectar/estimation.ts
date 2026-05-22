/** Scalar linear MMSE under zero-mean Gaussian signal + noise. Y = X + N */

export function mmseCoefficients(signalVar: number, noiseVar: number): { a: number; b: number } {
  const denom = signalVar + noiseVar;
  if (denom <= 0) return { a: 0, b: 0 };
  const a = signalVar / denom;
  return { a, b: 0 };
}

export function mmseEstimate(y: number, signalVar: number, noiseVar: number): number {
  const { a } = mmseCoefficients(signalVar, noiseVar);
  return a * y;
}

export function theoreticalMse(signalVar: number, noiseVar: number): number {
  const { a } = mmseCoefficients(signalVar, noiseVar);
  return signalVar * (1 - a);
}

export function sampleGaussian(std: number): number {
  // Box-Muller
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return z * std;
}
