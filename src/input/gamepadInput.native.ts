/**
 * Native gamepad bridge — STUB
 *
 * Expo Go does not expose PS5/Xbox controllers through a unified JS API.
 * Future options:
 * - expo-dev-client + react-native-gamepad-controller
 * - iOS: GCController framework via native module
 * - Android: InputDevice / KeyEvent via native module
 *
 * Until then, touch and on-screen controls are the primary native input path.
 */

import type { InputState } from './inputTypes';
import { createEmptyInput } from './inputTypes';

export interface ConnectedGamepadInfo {
  index: number;
  id: string;
  label: string;
  connected: boolean;
}

export function listConnectedGamepads(): ConnectedGamepadInfo[] {
  return [];
}

export function pollGamepad(_gamepadIndex: number): InputState {
  return createEmptyInput();
}

export function getGamepadRaw(_index: number) {
  return null;
}
