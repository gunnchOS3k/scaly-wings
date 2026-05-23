export type PlayMode = 'phone' | 'tabletop' | 'cocoonConsole';

export interface AppSettings {
  preferredMode: PlayMode;
  reducedMotion: boolean;
  highContrast: boolean;
  showLearningPanels: boolean;
  showRecruiterPanels: boolean;
  inputDebugOverlay: boolean;
  defaultDifficulty: 'easy' | 'medium' | 'hard';
  hapticsPlaceholder: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  preferredMode: 'phone',
  reducedMotion: false,
  highContrast: false,
  showLearningPanels: true,
  showRecruiterPanels: true,
  inputDebugOverlay: false,
  defaultDifficulty: 'easy',
  hapticsPlaceholder: false,
};
