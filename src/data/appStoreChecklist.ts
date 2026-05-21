export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

export const iosChecklist: ChecklistItem[] = [
  { id: 'apple-dev', title: 'Apple Developer account', description: 'Enroll at developer.apple.com ($99/year).', done: false },
  { id: 'bundle-id', title: 'Bundle ID', description: 'com.gunnchos3k.scalywings — register in App Store Connect.', done: false },
  { id: 'icon', title: 'App icon 1024×1024', description: 'Hot pink butterfly mark, no transparency.', done: false },
  { id: 'splash', title: 'Splash screen', description: 'Cream + hot pink gradient with Scaly Wings title.', done: false },
  { id: 'privacy', title: 'Privacy policy URL', description: 'Host a simple policy page (even on GitHub Pages).', done: false },
  { id: 'screenshots', title: 'Screenshots', description: '6.7", 6.5", iPad if supporting tablet.', done: false },
  { id: 'testflight', title: 'TestFlight beta', description: 'EAS build → internal testers.', done: false },
];

export const androidChecklist: ChecklistItem[] = [
  { id: 'play-dev', title: 'Google Play Developer account', description: 'One-time registration fee.', done: false },
  { id: 'package', title: 'Package name', description: 'com.gunnchos3k.scalywings', done: false },
  { id: 'feature-graphic', title: 'Feature graphic 1024×500', description: 'Store listing banner.', done: false },
  { id: 'data-safety', title: 'Data safety form', description: 'Declare local-only high scores (AsyncStorage).', done: false },
  { id: 'internal-test', title: 'Internal testing track', description: 'Upload AAB via Play Console or EAS Submit.', done: false },
];
