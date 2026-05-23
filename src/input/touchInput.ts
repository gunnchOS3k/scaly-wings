import type { InputAction, InputState } from './inputTypes';
import { createEmptyInput } from './inputTypes';

const touchHeld = new Map<number, Set<InputAction>>();

export function setTouchAction(playerId: number, action: InputAction, pressed: boolean): void {
  if (!touchHeld.has(playerId)) touchHeld.set(playerId, new Set());
  const set = touchHeld.get(playerId)!;
  if (pressed) set.add(action);
  else set.delete(action);
}

export function clearTouchPlayer(playerId: number): void {
  touchHeld.delete(playerId);
}

export function pollTouch(playerId: number): InputState {
  const state = createEmptyInput();
  const set = touchHeld.get(playerId);
  if (!set) return state;
  for (const action of set) {
    state.actions[action] = true;
  }
  if (state.actions.moveLeft) state.moveX -= 1;
  if (state.actions.moveRight) state.moveX += 1;
  return state;
}
