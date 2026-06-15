import type { LanguageCode, LanguageMeta } from './types';

export const LANGUAGE_STORAGE_KEY = '@scaly-wings/language';

export const supportedLanguages: LanguageMeta[] = [
  {
    code: 'en',
    nativeName: 'English',
    englishName: 'English',
    direction: 'ltr',
    reviewer: 'Edmund/Yasmine',
    status: 'source',
  },
  {
    code: 'ar',
    nativeName: 'العربية',
    englishName: 'Arabic',
    direction: 'rtl',
    reviewer: 'Yasmine review required',
    status: 'draft-human-review-required',
  },
  {
    code: 'fr',
    nativeName: 'Français',
    englishName: 'French',
    direction: 'ltr',
    reviewer: 'Yasmine review required',
    status: 'draft-human-review-required',
  },
  {
    code: 'es',
    nativeName: 'Español',
    englishName: 'Spanish',
    direction: 'ltr',
    reviewer: 'Edmund review required',
    status: 'draft-human-review-required',
  },
  {
    code: 'fi',
    nativeName: 'Suomi',
    englishName: 'Finnish',
    direction: 'ltr',
    reviewer: 'Edmund learning / Finnish native review recommended',
    status: 'draft-human-review-required',
  },
];

const SUPPORTED_CODES = new Set(supportedLanguages.map((l) => l.code));

export function isSupportedLanguage(code: string): code is LanguageCode {
  return SUPPORTED_CODES.has(code as LanguageCode);
}

export function getLanguageMeta(code: LanguageCode): LanguageMeta {
  return supportedLanguages.find((l) => l.code === code) ?? supportedLanguages[0];
}

/** Map device locale (e.g. ar-SA, fr-FR) to a supported app language code. */
export function getLanguageCodeFromLocale(locale?: string | null): LanguageCode {
  if (!locale) return 'en';
  const base = locale.split('-')[0].toLowerCase();
  if (isSupportedLanguage(base)) return base;
  return 'en';
}
