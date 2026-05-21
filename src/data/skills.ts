export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  { name: 'Mobile', skills: ['React Native', 'Expo', 'iOS & Android targets'] },
  { name: 'Web', skills: ['Expo Web', 'Responsive layout', 'PWA-friendly'] },
  { name: 'Languages', skills: ['TypeScript', 'Python (learning path)'] },
  { name: 'Games', skills: ['Game loops', 'Collision', 'Grid algorithms', 'Timers'] },
  { name: 'Product', skills: ['Portfolio UX', 'Documentation', 'App store prep'] },
];
