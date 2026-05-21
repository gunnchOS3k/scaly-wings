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
