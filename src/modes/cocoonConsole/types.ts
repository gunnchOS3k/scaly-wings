export type DisplayMode = 'handheld' | 'tabletop' | 'bigScreen';

export interface CocoonConsoleState {
  displayMode: DisplayMode;
  player1Controller: string;
  player2Controller: string;
}
