import { detectGamepadLabel, mapGamepadToActions } from './controllerMappings';
import type { InputState } from './inputTypes';
import { createEmptyInput } from './inputTypes';

export interface ConnectedGamepadInfo {
  index: number;
  id: string;
  label: string;
  connected: boolean;
}

export function listConnectedGamepads(): ConnectedGamepadInfo[] {
  if (typeof navigator === 'undefined' || !navigator.getGamepads) return [];
  const pads = navigator.getGamepads();
  const out: ConnectedGamepadInfo[] = [];
  for (let i = 0; i < pads.length; i++) {
    const gp = pads[i];
    if (!gp) continue;
    out.push({
      index: gp.index,
      id: gp.id,
      label: detectGamepadLabel(gp.id),
      connected: gp.connected,
    });
  }
  return out;
}

export function pollGamepad(gamepadIndex: number): InputState {
  const state = createEmptyInput();
  if (typeof navigator === 'undefined' || !navigator.getGamepads) return state;
  const gp = navigator.getGamepads()[gamepadIndex];
  if (!gp?.connected) return state;

  const actions = mapGamepadToActions(gp.buttons, gp.axes);
  state.actions = actions;
  const lx = gp.axes[0] ?? 0;
  const ly = gp.axes[1] ?? 0;
  state.moveX = Math.abs(lx) > 0.25 ? lx : actions.moveLeft ? -1 : actions.moveRight ? 1 : 0;
  state.moveY = Math.abs(ly) > 0.25 ? ly : 0;
  return state;
}

/** Raw debug snapshot for controller test page */
export function getGamepadRaw(index: number) {
  const gp = typeof navigator !== 'undefined' ? navigator.getGamepads()[index] : null;
  if (!gp) return null;
  return {
    id: gp.id,
    label: detectGamepadLabel(gp.id),
    buttons: gp.buttons.map((b, i) => ({ i, pressed: b.pressed, value: b.value })),
    axes: [...gp.axes],
    mapped: mapGamepadToActions(gp.buttons, gp.axes),
  };
}
