/** Edit this file to update Yasmine's portfolio content. */

export interface YasmineProfile {
  name: string;
  tagline: string;
  school: string;
  expectedGraduation: string;
  major: string;
  interests: string[];
  skills: string[];
  projectHighlights: string[];
  resumeBullets: string[];
  links: { label: string; url: string }[];
  sections: {
    whoSheIs: string;
    whatShesBuilding: string;
    technicalInterests: string[];
    favoriteTools: string[];
    mathCuriosity: string;
    whyScalyWings: string;
    recruiterHighlights: string[];
  };
}

export const yasmineProfile: YasmineProfile = {
  name: 'Yasmine Dweir',
  tagline: 'Butterflies, hot pink, math, and software that transforms curiosity into skill.',
  school: '[Your school — edit me]',
  expectedGraduation: '[Expected graduation year — edit me]',
  major: '[Your major — edit me]',
  interests: [
    'Butterflies and lepidoptera',
    'Mathematics and problem-solving',
    'Python and data curiosity',
    'Mobile and cross-platform apps',
    'Learning deeply',
  ],
  skills: [
    'TypeScript / React Native (building)',
    'Python (learning)',
    'Game logic & UI design',
    'Controller input abstraction',
    'Physics & platformer mechanics',
    'Local multiplayer design',
    'Documentation & portfolio storytelling',
    'Collaboration',
  ],
  projectHighlights: [
    'Scaly Wings — butterfly arcade, Probability Wing, Pinball, Wing Run',
    'Cocoon Console Mode — phone-to-big-screen playbook',
    'Future: data projects, Python recreations, published apps',
  ],
  resumeBullets: [
    'Built Scaly Wings: cross-platform Expo app with arcade games, probability labs, pinball, and side-scroller.',
    'Created reusable input layer mapping touch, keyboard, and gamepad actions (PS5/Xbox on web).',
    'Documented Cocoon Console Mode for handheld, tabletop, and big-screen play without overpromising HDMI.',
    'Authored architecture docs, UML diagrams, and Python recreation guides.',
  ],
  links: [
    { label: 'GitHub', url: 'https://github.com/[your-username]' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/[your-profile]' },
    { label: 'Email', url: 'mailto:[your-email@example.com]' },
  ],
  sections: {
    whoSheIs:
      'Yasmine is curious, creative, and drawn to transformation — in nature, in math, and in code. She loves butterflies, bold design, and projects that prove she can learn, build, and explain real software.',
    whatShesBuilding:
      'Scaly Wings is her flagship summer project: a mobile-first butterfly arcade that doubles as a portfolio piece. She is growing skills in TypeScript, React Native, game design, and technical writing.',
    technicalInterests: [
      'Cross-platform mobile (Expo / React Native)',
      'Python for games and data',
      'Math-forward educational games',
      'Accessible, beautiful UX',
    ],
    favoriteTools: [
      'Python',
      'Expo / React Native',
      'Git & GitHub',
      'VS Code / Cursor',
      'Jupyter (for data exploration)',
    ],
    mathCuriosity:
      'Math is not just homework — it is a lens for patterns, probability, and growth. Pupa Math Boost turns arithmetic and algebra practice into metamorphosis progress.',
    whyScalyWings:
      'Scaly Wings exists so Yasmine can show recruiters and professors a complete product: playable games, clear docs, app-store readiness, and a path to rebuild everything in Python. Iron sharpens iron.',
    recruiterHighlights: [
      'Shipped a cohesive product vision, not a tutorial clone',
      'Separated game engines from UI for testable logic',
      'Controller-ready and big-screen-conscious product design',
      'Original butterfly platformer — not Mario/Nintendo IP',
      'Documented architecture, UML, and store publishing checklists',
      'Designed for mobile, web, and future iOS/Android releases',
    ],
  },
};
