export function followCamera(playerX: number, viewW: number, levelW: number): number {
  const target = playerX - viewW * 0.35;
  return Math.max(0, Math.min(levelW - viewW, target));
}
