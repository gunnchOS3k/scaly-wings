export interface PortfolioProject {
  id: string;
  title: string;
  role: string;
  stack: string[];
  problemSolved: string;
  skillsDemonstrated: string[];
  recruiterKeywords: string[];
  link?: string;
  featured?: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'scaly-wings',
    title: 'Scaly Wings',
    role: 'Lead Builder (with gunnchOS3k MLV mentorship)',
    stack: ['Expo', 'React Native', 'TypeScript', 'AsyncStorage'],
    problemSolved:
      'Create a recruiter-ready portfolio app that combines arcade games, math practice, and professional storytelling in one cross-platform product.',
    skillsDemonstrated: [
      'Game loops & collision detection',
      'Multiplayer input mapping',
      'Data-driven UI',
      'Technical documentation',
      'Mobile-first UX',
    ],
    recruiterKeywords: [
      'React Native',
      'TypeScript',
      'Cross-platform',
      'Game development',
      'Technical writing',
    ],
    link: 'https://github.com/gunnchOS3k/scaly-wings',
    featured: true,
  },
  {
    id: 'probability-wing',
    title: 'Probability & Stochastic Processes Wing',
    role: 'Educational game design (Scaly Wings module)',
    stack: ['TypeScript', 'React Native', 'Simulation', 'MMSE', 'Poisson processes'],
    problemSolved:
      'Turn Probability and Stochastic Processes coursework into playable butterfly labs that connect theory, simulation, estimation, and Python recreation — without real-money gambling.',
    skillsDemonstrated: [
      'Probability simulation & expected value',
      'Noise modeling & MMSE estimation',
      'Poisson arrival processes',
      'Educational UX & ethical game design',
      'Technical documentation for recruiters',
    ],
    recruiterKeywords: [
      'Stochastic processes',
      'MMSE',
      'Poisson process',
      'Simulation',
      'Data visualization',
      'Python',
    ],
    link: 'https://github.com/gunnchOS3k/scaly-wings',
    featured: true,
  },
  {
    id: 'scaly-pinball',
    title: 'Scaly Wings Pinball',
    role: 'Game developer',
    stack: ['Expo', 'TypeScript', 'Physics', 'InputManager'],
    problemSolved:
      'Nostalgia-inspired tabletop pinball reimagined as butterfly garden nectar physics with cross-platform flippers.',
    skillsDemonstrated: ['Physics simulation', 'Collision', 'Input abstraction', 'State machines'],
    recruiterKeywords: ['Game physics', 'React Native', 'Controller input'],
    featured: false,
  },
  {
    id: 'wing-run',
    title: 'Wing Run: Nectar Valley',
    role: 'Level designer & developer',
    stack: ['Expo', 'TypeScript', 'Camera', 'Collision'],
    problemSolved:
      'Original linear side-scrolling butterfly platformer with educational probability gates — no Nintendo assets.',
    skillsDemonstrated: ['Platformer', 'Camera', 'Level design', 'Educational gates'],
    recruiterKeywords: ['Side-scroller', 'Collision', 'Accessibility'],
    featured: false,
  },
  {
    id: 'cocoon-console',
    title: 'Cocoon Console Mode',
    role: 'Product designer',
    stack: ['Expo', 'Gamepad API', 'Documentation'],
    problemSolved:
      'Phone-as-console experience with handheld, tabletop, and big-screen playbooks and controller assignment.',
    skillsDemonstrated: ['Product thinking', 'Controller mapping', 'Local multiplayer'],
    recruiterKeywords: ['Cross-platform', 'UX', 'Documentation'],
    featured: false,
  },
  {
    id: 'finds-sharks',
    title: 'FINDS: Sharks From Space',
    role: 'Inspiration / collaboration placeholder',
    stack: ['NASA data', 'React Native', 'Expo', 'Geospatial visualization'],
    problemSolved:
      'NASA-powered shark hotspot forecasting — a separate project that inspired cross-platform product thinking. Not bundled inside Scaly Wings.',
    skillsDemonstrated: [
      'Data visualization',
      'API integration patterns',
      'Science communication',
    ],
    recruiterKeywords: ['Data science', 'NASA', 'Mobile', 'Science outreach'],
    link: 'https://github.com/gunnchOS3k/finds_-shark-hotspot-forecaster',
    featured: false,
  },
  {
    id: 'future-1',
    title: '[Future Project Title]',
    role: '[Your role]',
    stack: ['Python', 'pandas', 'matplotlib'],
    problemSolved: '[Describe the problem you will solve — edit me]',
    skillsDemonstrated: ['Data analysis', 'Visualization'],
    recruiterKeywords: ['Python', 'Data science'],
    featured: false,
  },
];
