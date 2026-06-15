export type LanguageCode = 'en' | 'ar' | 'fr' | 'es' | 'fi';

export type TextDirection = 'ltr' | 'rtl';

export type TranslationStatus = 'source' | 'draft-human-review-required';

export interface LanguageMeta {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
  direction: TextDirection;
  reviewer: string;
  status: TranslationStatus;
}

export interface LocaleMeta {
  language: string;
  status: TranslationStatus;
  reviewer: string;
}
