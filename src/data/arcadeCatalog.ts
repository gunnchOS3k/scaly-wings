export type InputBadge = 'touch' | 'keyboard' | 'controller' | 'multiplayer' | 'bigScreen';

export interface ArcadeEntry {
  titleKey: string;
  descriptionKey: string;
  emoji: string;
  route: string;
  section: 'core' | 'probability' | 'console' | 'tools';
  badges: Record<InputBadge, boolean>;
  skills: string[];
}

export const ARCADE_GAMES: ArcadeEntry[] = [
  {
    titleKey: 'arcade.games.flutterFlight.title',
    descriptionKey: 'arcade.games.flutterFlight.description',
    emoji: '🦋',
    route: '/games/flutter-flight',
    section: 'core',
    badges: { touch: true, keyboard: true, controller: true, multiplayer: false, bigScreen: true },
    skills: ['Game loop', 'Collision'],
  },
  {
    titleKey: 'arcade.games.larvaLeafRace.title',
    descriptionKey: 'arcade.games.larvaLeafRace.description',
    emoji: '🐛',
    route: '/games/larva-leaf-race',
    section: 'core',
    badges: { touch: true, keyboard: true, controller: true, multiplayer: true, bigScreen: true },
    skills: ['Grid', 'Local MP'],
  },
  {
    titleKey: 'arcade.games.pupaMathBoost.title',
    descriptionKey: 'arcade.games.pupaMathBoost.description',
    emoji: '📐',
    route: '/games/pupa-math-boost',
    section: 'core',
    badges: { touch: true, keyboard: true, controller: false, multiplayer: false, bigScreen: false },
    skills: ['Ed-tech'],
  },
  {
    titleKey: 'arcade.games.probabilityWing.title',
    descriptionKey: 'arcade.games.probabilityWing.description',
    emoji: '📊',
    route: '/probability-wing',
    section: 'probability',
    badges: { touch: true, keyboard: true, controller: false, multiplayer: false, bigScreen: true },
    skills: ['Probability', 'Estimation'],
  },
  {
    titleKey: 'arcade.games.pinball.title',
    descriptionKey: 'arcade.games.pinball.description',
    emoji: '🎮',
    route: '/games/pinball',
    section: 'console',
    badges: { touch: true, keyboard: true, controller: true, multiplayer: false, bigScreen: true },
    skills: ['Physics', 'Collision'],
  },
  {
    titleKey: 'arcade.games.wingRun.title',
    descriptionKey: 'arcade.games.wingRun.description',
    emoji: '🌸',
    route: '/games/wing-run',
    section: 'console',
    badges: { touch: true, keyboard: true, controller: true, multiplayer: false, bigScreen: true },
    skills: ['Platformer', 'Camera'],
  },
  {
    titleKey: 'arcade.games.controllerTest.title',
    descriptionKey: 'arcade.games.controllerTest.description',
    emoji: '🕹️',
    route: '/controller-test',
    section: 'tools',
    badges: { touch: false, keyboard: true, controller: true, multiplayer: true, bigScreen: true },
    skills: ['Controller Input'],
  },
  {
    titleKey: 'arcade.games.cocoonConsole.title',
    descriptionKey: 'arcade.games.cocoonConsole.description',
    emoji: '📺',
    route: '/cocoon-console',
    section: 'tools',
    badges: { touch: true, keyboard: false, controller: true, multiplayer: true, bigScreen: true },
    skills: ['Product'],
  },
  {
    titleKey: 'arcade.games.settings.title',
    descriptionKey: 'arcade.games.settings.description',
    emoji: '⚙️',
    route: '/settings',
    section: 'tools',
    badges: { touch: true, keyboard: false, controller: false, multiplayer: false, bigScreen: false },
    skills: ['UX'],
  },
];

export const ARCADE_SECTION_KEYS = {
  core: 'arcade.sections.core',
  probability: 'arcade.sections.probability',
  console: 'arcade.sections.console',
  tools: 'arcade.sections.tools',
} as const;

export const BADGE_KEYS: Record<InputBadge, string> = {
  touch: 'arcade.badges.touch',
  keyboard: 'arcade.badges.keyboard',
  controller: 'arcade.badges.controller',
  multiplayer: 'arcade.badges.multiplayer',
  bigScreen: 'arcade.badges.bigScreen',
};
