import type { InputAction } from './inputTypes';

/** Standard button indices (W3C Gamepad standard mapping). */
export const GAMEPAD = {
  A: 0,
  B: 1,
  X: 2,
  Y: 3,
  L1: 4,
  R1: 5,
  L2: 6,
  R2: 7,
  SELECT: 8,
  START: 9,
  L_STICK: 10,
  R_STICK: 11,
  DPAD_UP: 12,
  DPAD_DOWN: 13,
  DPAD_LEFT: 14,
  DPAD_RIGHT: 15,
} as const;

export interface GamepadProfile {
  nameMatch: RegExp;
  label: string;
}

export const GAMEPAD_PROFILES: GamepadProfile[] = [
  { nameMatch: /dualsense|playstation|ps5|ps4/i, label: 'PS5 DualSense' },
  { nameMatch: /xbox|xinput|microsoft/i, label: 'Xbox Controller' },
  { nameMatch: /.*/, label: 'Generic Gamepad' },
];

export function detectGamepadLabel(id: string): string {
  for (const p of GAMEPAD_PROFILES) {
    if (p.nameMatch.test(id)) return p.label;
  }
  return 'Generic Gamepad';
}

/** Map raw gamepad to logical actions for player 1. */
export function mapGamepadToActions(
  buttons: readonly GamepadButton[],
  axes: readonly number[],
  deadzone = 0.25
): Partial<Record<InputAction, boolean>> {
  const pressed = (i: number) => !!buttons[i]?.pressed;
  const axis = (i: number) => {
    const v = axes[i] ?? 0;
    return Math.abs(v) < deadzone ? 0 : v;
  };

  const lx = axis(0);
  const ly = axis(1);

  const actions: Partial<Record<InputAction, boolean>> = {
    moveLeft: lx < -deadzone || pressed(GAMEPAD.DPAD_LEFT),
    moveRight: lx > deadzone || pressed(GAMEPAD.DPAD_RIGHT),
    moveUp: ly < -deadzone || pressed(GAMEPAD.DPAD_UP),
    moveDown: ly > deadzone || pressed(GAMEPAD.DPAD_DOWN),
    jump: pressed(GAMEPAD.A),
    flap: pressed(GAMEPAD.A),
    confirm: pressed(GAMEPAD.A),
    dash: pressed(GAMEPAD.X),
    glide: pressed(GAMEPAD.B) || pressed(GAMEPAD.R2),
    leftFlipper: pressed(GAMEPAD.L1) || pressed(GAMEPAD.L2),
    rightFlipper: pressed(GAMEPAD.R1) || pressed(GAMEPAD.R2),
    launch: pressed(GAMEPAD.A),
    pause: pressed(GAMEPAD.START) || pressed(GAMEPAD.SELECT),
    back: pressed(GAMEPAD.B),
  };
  return actions;
}

export const KEYBOARD_MAP: Record<string, InputAction | InputAction[]> = {
  ArrowLeft: 'moveLeft',
  KeyA: 'moveLeft',
  ArrowRight: 'moveRight',
  KeyD: 'moveRight',
  ArrowUp: 'moveUp',
  KeyW: 'moveUp',
  ArrowDown: ['moveDown', 'glide'],
  KeyS: ['moveDown', 'glide'],
  Space: ['jump', 'flap', 'launch'],
  ShiftLeft: 'dash',
  ShiftRight: 'dash',
  KeyZ: 'leftFlipper',
  KeyC: 'rightFlipper',
  Enter: ['confirm', 'pause'],
  Escape: 'pause',
  Backspace: 'back',
};
