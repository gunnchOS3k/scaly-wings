import en from './locales/en.json';
import ar from './locales/ar.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import fi from './locales/fi.json';

export const resources = {
  en: { translation: en },
  ar: { translation: ar },
  fr: { translation: fr },
  es: { translation: es },
  fi: { translation: fi },
} as const;

export type TranslationResources = typeof resources;
