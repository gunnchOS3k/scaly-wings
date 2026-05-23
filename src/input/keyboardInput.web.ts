import { KEYBOARD_MAP } from './controllerMappings';
import type { InputAction, InputState } from './inputTypes';
import { createEmptyInput } from './inputTypes';

const held = new Set<string>();

export function initKeyboardInput(): void {
  if (typeof window === 'undefined') return;
  const down = (e: KeyboardEvent) => {
    held.add(e.code);
  };
  const up = (e: KeyboardEvent) => {
    held.delete(e.code);
  };
  window.addEventListener('keydown', down);
  window.addEventListener('keyup', up);
}

export function pollKeyboard(): InputState {
  const state = createEmptyInput();
  if (typeof window === 'undefined') return state;

  for (const code of held) {
    const mapped = KEYBOARD_MAP[code];
    if (!mapped) continue;
    const list = Array.isArray(mapped) ? mapped : [mapped];
    for (const action of list) {
      state.actions[action] = true;
    }
  }
  if (state.actions.moveLeft) state.moveX -= 1;
  if (state.actions.moveRight) state.moveX += 1;
  if (state.actions.moveUp) state.moveY -= 1;
  if (state.actions.moveDown) state.moveY += 1;
  return state;
}

export function setKeyboardAction(action: InputAction, pressed: boolean): void {
  // Touch overlay can inject via InputManager instead
}
