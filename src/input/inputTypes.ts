export type InputAction =
  | 'moveLeft'
  | 'moveRight'
  | 'moveUp'
  | 'moveDown'
  | 'jump'
  | 'flap'
  | 'glide'
  | 'dash'
  | 'leftFlipper'
  | 'rightFlipper'
  | 'launch'
  | 'pause'
  | 'confirm'
  | 'back';

export type ControllerType = 'touch' | 'keyboard' | 'gamepad' | 'unknown';

export interface InputState {
  /** Logical actions currently held */
  actions: Partial<Record<InputAction, boolean>>;
  /** Horizontal axis −1..1 (sticks) */
  moveX: number;
  moveY: number;
}

export interface ControllerMapping {
  id: string;
  label: string;
  type: ControllerType;
  /** Gamepad index when type is gamepad */
  gamepadIndex?: number;
}

export interface PlayerInputMap {
  playerId: 1 | 2;
  controller: ControllerMapping;
}

export const EMPTY_INPUT: InputState = { actions: {}, moveX: 0, moveY: 0 };

export function createEmptyInput(): InputState {
  return { actions: {}, moveX: 0, moveY: 0 };
}

export function isPressed(state: InputState, action: InputAction): boolean {
  return !!state.actions[action];
}
