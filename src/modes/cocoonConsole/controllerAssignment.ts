import { inputManager } from '@/src/input/InputManager';
import type { PlayerInputMap } from '@/src/input/inputTypes';

export function assignControllerToPlayer(playerId: 1 | 2, gamepadIndex: number): PlayerInputMap[] {
  inputManager.assignGamepadToPlayer(playerId, gamepadIndex);
  return inputManager.getPlayerMaps();
}

export function getAssignmentSummary(): string[] {
  return inputManager.getPlayerMaps().map(
    (m) => `Player ${m.playerId}: ${m.controller.label} (${m.controller.type})`
  );
}
