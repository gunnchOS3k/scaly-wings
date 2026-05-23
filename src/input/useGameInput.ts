import { useEffect, useState } from 'react';
import { createGameLoop } from '@/src/utils/gameLoop';
import { inputManager } from './InputManager';
import type { InputState } from './inputTypes';
import { createEmptyInput } from './inputTypes';

export function useGameInput(playerId: 1 | 2 = 1): InputState {
  const [state, setState] = useState<InputState>(createEmptyInput);

  useEffect(() => {
    inputManager.init();
    const loop = createGameLoop(() => {
      inputManager.poll();
      setState(inputManager.getState(playerId));
    });
    loop.start();
    return () => loop.stop();
  }, [playerId]);

  return state;
}

/** One-shot read without subscription */
export function readGameInput(playerId: 1 | 2 = 1): InputState {
  inputManager.init();
  inputManager.poll();
  return inputManager.getState(playerId);
}
