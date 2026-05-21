export function formatScore(score: number): string {
  return score.toLocaleString();
}

export function isNewHighScore(current: number, best: number): boolean {
  return current > best;
}

export function percentEaten(eaten: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((eaten / total) * 100);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
