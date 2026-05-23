export type InputBadge = 'touch' | 'keyboard' | 'controller' | 'multiplayer' | 'bigScreen';

export interface ArcadeEntry {
  title: string;
  description: string;
  emoji: string;
  route: string;
  section: 'core' | 'probability' | 'console' | 'tools';
  badges: Record<InputBadge, boolean>;
  skills: string[];
}

export const ARCADE_GAMES: ArcadeEntry[] = [
  {
    title: 'Flutter Flight',
    description: 'Flap through glowing gates.',
    emoji: '🦋',
    route: '/games/flutter-flight',
    section: 'core',
    badges: { touch: true, keyboard: true, controller: true, multiplayer: false, bigScreen: true },
    skills: ['Game loop', 'Collision'],
  },
  {
    title: 'Larva Leaf Race',
    description: 'Two larva · grid race · local multiplayer.',
    emoji: '🐛',
    route: '/games/larva-leaf-race',
    section: 'core',
    badges: { touch: true, keyboard: true, controller: true, multiplayer: true, bigScreen: true },
    skills: ['Grid', 'Local MP'],
  },
  {
    title: 'Pupa Math Boost',
    description: 'Math speeds metamorphosis.',
    emoji: '📐',
    route: '/games/pupa-math-boost',
    section: 'core',
    badges: { touch: true, keyboard: true, controller: false, multiplayer: false, bigScreen: false },
    skills: ['Ed-tech'],
  },
  {
    title: 'Probability Wing',
    description: 'Chance, noise & stochastic flight.',
    emoji: '📊',
    route: '/probability-wing',
    section: 'probability',
    badges: { touch: true, keyboard: true, controller: false, multiplayer: false, bigScreen: true },
    skills: ['Probability', 'Estimation'],
  },
  {
    title: 'Scaly Wings Pinball',
    description: 'Nectar pearl · garden bumpers · wing flippers.',
    emoji: '🎮',
    route: '/games/pinball',
    section: 'console',
    badges: { touch: true, keyboard: true, controller: true, multiplayer: false, bigScreen: true },
    skills: ['Physics', 'Collision'],
  },
  {
    title: 'Wing Run: Nectar Valley',
    description: 'Side-scrolling butterfly platformer.',
    emoji: '🌸',
    route: '/games/wing-run',
    section: 'console',
    badges: { touch: true, keyboard: true, controller: true, multiplayer: false, bigScreen: true },
    skills: ['Platformer', 'Camera'],
  },
  {
    title: 'Controller Test',
    description: 'Debug gamepads & mapped actions.',
    emoji: '🕹️',
    route: '/controller-test',
    section: 'tools',
    badges: { touch: false, keyboard: true, controller: true, multiplayer: true, bigScreen: true },
    skills: ['Controller Input'],
  },
  {
    title: 'Cocoon Console Mode',
    description: 'Handheld · tabletop · big screen setup.',
    emoji: '📺',
    route: '/cocoon-console',
    section: 'tools',
    badges: { touch: true, keyboard: false, controller: true, multiplayer: true, bigScreen: true },
    skills: ['Product'],
  },
  {
    title: 'Settings',
    description: 'Mode, accessibility, input debug.',
    emoji: '⚙️',
    route: '/settings',
    section: 'tools',
    badges: { touch: true, keyboard: false, controller: false, multiplayer: false, bigScreen: false },
    skills: ['UX'],
  },
];
