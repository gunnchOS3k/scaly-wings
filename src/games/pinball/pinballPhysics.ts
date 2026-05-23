import type { PinballBall, PinballBumper, PinballFlipper } from './types';

const GRAVITY = 0.35;
const DRAG = 0.995;
const WALL_BOUNCE = 0.75;

export function integrateBall(
  ball: PinballBall,
  tableW: number,
  tableH: number
): PinballBall {
  let { x, y, vx, vy, radius } = ball;
  vy += GRAVITY;
  vx *= DRAG;
  vy *= DRAG;
  x += vx;
  y += vy;

  if (x - radius < 0) {
    x = radius;
    vx = Math.abs(vx) * WALL_BOUNCE;
  }
  if (x + radius > tableW) {
    x = tableW - radius;
    vx = -Math.abs(vx) * WALL_BOUNCE;
  }
  if (y - radius < 0) {
    y = radius;
    vy = Math.abs(vy) * WALL_BOUNCE;
  }
  if (y + radius > tableH - 8) {
    y = tableH - 8 - radius;
    vy = -Math.abs(vy) * WALL_BOUNCE;
  }

  return { x, y, vx, vy, radius };
}

export function collideBumper(ball: PinballBall, bumper: PinballBumper): PinballBall {
  const dx = ball.x - bumper.x;
  const dy = ball.y - bumper.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const minDist = ball.radius + bumper.radius;
  if (dist >= minDist) return ball;

  const nx = dx / dist;
  const ny = dy / dist;
  const overlap = minDist - dist;
  const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy) + 2;
  return {
    x: ball.x + nx * overlap,
    y: ball.y + ny * overlap,
    vx: nx * speed,
    vy: ny * speed - 2,
    radius: ball.radius,
  };
}

export function collideFlipper(ball: PinballBall, flipper: PinballFlipper): PinballBall {
  if (!flipper.active) return ball;
  const dx = ball.x - flipper.x;
  const dy = ball.y - flipper.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  if (dist > ball.radius + 40) return ball;

  const kickX = flipper.side === 'left' ? 6 : -6;
  const kickY = -8;
  return {
    ...ball,
    vx: ball.vx + kickX,
    vy: ball.vy + kickY,
  };
}

export function isDrained(ball: PinballBall, tableW: number, tableH: number): boolean {
  return ball.y > tableH + ball.radius && ball.x > tableW * 0.35 && ball.x < tableW * 0.65;
}
