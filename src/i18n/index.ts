import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { resources } from './resources';
import { getSavedLanguage, saveLanguage, clearSavedLanguage } from './storage';
import {
  getLanguageCodeFromLocale,
  getLanguageMeta,
  isSupportedLanguage,
  supportedLanguages,
} from './languages';
import { isLanguageRTL, maybeApplyRTL } from './direction';
import { logMissingTranslationKey } from './missingKeys';
import type { LanguageCode } from './types';

export { supportedLanguages, getLanguageMeta, isSupportedLanguage };

let initPromise: Promise<typeof i18n> | null = null;

export function getDeviceLanguage(): LanguageCode {
  const locale = Localization.getLocales()[0]?.languageCode;
  return getLanguageCodeFromLocale(locale);
}

export async function initI18n(): Promise<typeof i18n> {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const saved = await getSavedLanguage();
    const initial = saved ?? getDeviceLanguage();

    if (!i18n.isInitialized) {
      await i18n.use(initReactI18next).init({
        resources,
        lng: initial,
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false,
        returnEmptyString: false,
        parseMissingKeyHandler: (key) => {
          logMissingTranslationKey(key, i18n.language);
          return key;
        },
      });
    }

    maybeApplyRTL(initial);
    return i18n;
  })();

  return initPromise;
}

export async function setAppLanguage(
  languageCode: LanguageCode
): Promise<{ needsRestart: boolean }> {
  await saveLanguage(languageCode);
  await i18n.changeLanguage(languageCode);
  const needsRestart = maybeApplyRTL(languageCode);
  return { needsRestart };
}

export async function resetToDeviceLanguage(): Promise<{ needsRestart: boolean }> {
  await clearSavedLanguage();
  const device = getDeviceLanguage();
  await i18n.changeLanguage(device);
  const needsRestart = maybeApplyRTL(device);
  return { needsRestart };
}

export { getSavedLanguage, saveLanguage, clearSavedLanguage };
export { isLanguageRTL };

export default i18n;
