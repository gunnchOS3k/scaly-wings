import type { ButterflyPlayer, Platform, Hazard, Collectible } from './types';

export function aabbOverlap(
  ax: number,
  ay: number,
  aw: number,
  ah: number,
  bx: number,
  by: number,
  bw: number,
  bh: number
): boolean {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

export function resolvePlatformCollision(
  player: ButterflyPlayer,
  platforms: Platform[]
): { player: ButterflyPlayer; onGround: boolean } {
  let p = { ...player };
  let onGround = false;
  for (const plat of platforms) {
    if (
      !aabbOverlap(p.x, p.y, p.width, p.height, plat.x, plat.y, plat.w, plat.h)
    ) {
      continue;
    }
    const overlapBottom = p.y + p.height - plat.y;
    const overlapTop = plat.y + plat.h - p.y;
    if (overlapBottom < overlapTop && p.vy >= 0) {
      p.y = plat.y - p.height;
      p.vy = 0;
      onGround = true;
    } else if (p.vy < 0) {
      p.y = plat.y + plat.h;
      p.vy = 0;
    }
  }
  p.onGround = onGround;
  return { player: p, onGround };
}

export function hitsHazard(player: ButterflyPlayer, hazards: Hazard[]): Hazard | null {
  for (const h of hazards) {
    if (aabbOverlap(player.x, player.y, player.width, player.height, h.x, h.y, h.w, h.h)) {
      return h;
    }
  }
  return null;
}

export function collectItems(
  player: ButterflyPlayer,
  collectibles: Collectible[]
): { items: Collectible[]; gained: number } {
  let gained = 0;
  const items = collectibles.map((c) => {
    if (c.collected) return c;
    if (aabbOverlap(player.x, player.y, player.width, player.height, c.x, c.y, 20, 20)) {
      gained += c.kind === 'pollen' ? 10 : c.kind === 'nectar' ? 25 : 15;
      return { ...c, collected: true };
    }
    return c;
  });
  return { items, gained };
}
