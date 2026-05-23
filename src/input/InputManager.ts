import { Platform } from 'react-native';
import type { InputAction, InputState, PlayerInputMap } from './inputTypes';
import { createEmptyInput } from './inputTypes';
import { pollTouch, setTouchAction } from './touchInput';
import * as keyboardWeb from './keyboardInput.web';
import * as gamepadWeb from './gamepadInput.web';
import * as gamepadNative from './gamepadInput.native';

const gamepad = Platform.OS === 'web' ? gamepadWeb : gamepadNative;

let keyboardInited = false;

export class InputManager {
  private playerMaps: PlayerInputMap[] = [
    { playerId: 1, controller: { id: 'p1-default', label: 'Touch / Keyboard', type: 'touch' } },
    { playerId: 2, controller: { id: 'p2-default', label: 'Touch P2', type: 'touch' } },
  ];

  init(): void {
    if (Platform.OS === 'web' && !keyboardInited) {
      keyboardWeb.initKeyboardInput();
      keyboardInited = true;
    }
  }

  assignGamepadToPlayer(playerId: 1 | 2, gamepadIndex: number): void {
    const list = gamepad.listConnectedGamepads();
    const gp = list.find((g) => g.index === gamepadIndex);
    const map: PlayerInputMap = {
      playerId,
      controller: {
        id: `gp-${gamepadIndex}`,
        label: gp?.label ?? `Gamepad ${gamepadIndex}`,
        type: 'gamepad',
        gamepadIndex,
      },
    };
    this.playerMaps = this.playerMaps.filter((m) => m.playerId !== playerId).concat(map);
  }

  getPlayerMaps(): PlayerInputMap[] {
    return this.playerMaps;
  }

  setTouch(playerId: 1 | 2, action: InputAction, pressed: boolean): void {
    setTouchAction(playerId, action, pressed);
  }

  poll(): void {
    // Side-effect poll hooks for keyboard listeners (web)
  }

  getState(playerId: 1 | 2 = 1): InputState {
    const map = this.playerMaps.find((m) => m.playerId === playerId);
    const touch = pollTouch(playerId);

    if (Platform.OS === 'web') {
      const kb = keyboardWeb.pollKeyboard();
      if (playerId === 1) return mergeInput(kb, touch);
    }

    if (map?.controller.type === 'gamepad' && map.controller.gamepadIndex != null) {
      const gp = gamepad.pollGamepad(map.controller.gamepadIndex);
      return mergeInput(gp, touch);
    }

    return touch;
  }

  listGamepads() {
    return gamepad.listConnectedGamepads();
  }

  getGamepadRaw(index: number) {
    return gamepad.getGamepadRaw(index);
  }
}

function mergeInput(a: InputState, b: InputState): InputState {
  const actions = { ...a.actions, ...b.actions };
  for (const key of Object.keys(b.actions) as InputAction[]) {
    if (b.actions[key]) actions[key] = true;
  }
  return {
    actions,
    moveX: Math.abs(b.moveX) > Math.abs(a.moveX) ? b.moveX : a.moveX,
    moveY: Math.abs(b.moveY) > Math.abs(a.moveY) ? b.moveY : a.moveY,
  };
}

export const inputManager = new InputManager();
