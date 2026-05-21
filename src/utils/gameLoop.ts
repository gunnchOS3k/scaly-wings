/** Simple requestAnimationFrame-style loop for React Native / web. */
export type GameLoopCallback = (deltaMs: number) => void;

export function createGameLoop(onTick: GameLoopCallback): {
  start: () => void;
  stop: () => void;
} {
  let running = false;
  let last = 0;
  let frameId: number | ReturnType<typeof setTimeout> | null = null;

  const tick = (now: number) => {
    if (!running) return;
    const delta = last ? now - last : 16;
    last = now;
    onTick(Math.min(delta, 50));
    schedule();
  };

  const schedule = () => {
    if (typeof requestAnimationFrame !== 'undefined') {
      frameId = requestAnimationFrame(tick);
    } else {
      frameId = setTimeout(() => tick(Date.now()), 16) as ReturnType<typeof setTimeout>;
    }
  };

  return {
    start: () => {
      if (running) return;
      running = true;
      last = 0;
      schedule();
    },
    stop: () => {
      running = false;
      if (frameId != null) {
        if (typeof cancelAnimationFrame !== 'undefined' && typeof frameId === 'number') {
          cancelAnimationFrame(frameId);
        } else {
          clearTimeout(frameId as ReturnType<typeof setTimeout>);
        }
        frameId = null;
      }
    },
  };
}
