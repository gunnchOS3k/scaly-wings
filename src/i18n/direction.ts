import { I18nManager, Platform } from 'react-native';
import type { LanguageCode, TextDirection } from './types';
import { getLanguageMeta } from './languages';

export function isLanguageRTL(languageCode: LanguageCode): boolean {
  return getLanguageMeta(languageCode).direction === 'rtl';
}

export function getTextAlignForLanguage(languageCode: LanguageCode): 'left' | 'right' | 'center' {
  if (isLanguageRTL(languageCode)) return 'right';
  return 'left';
}

export function getFlexDirectionForLanguage(
  languageCode: LanguageCode
): 'row' | 'row-reverse' {
  if (isLanguageRTL(languageCode)) return 'row-reverse';
  return 'row';
}

export function getWritingDirection(languageCode: LanguageCode): TextDirection {
  return isLanguageRTL(languageCode) ? 'rtl' : 'ltr';
}

/**
 * Apply RTL at the native layout level when switching to/from Arabic.
 * Returns true if a full app restart is recommended for layout to settle.
 */
export function maybeApplyRTL(languageCode: LanguageCode): boolean {
  const shouldRTL = isLanguageRTL(languageCode);
  const currentlyRTL = I18nManager.isRTL;

  if (shouldRTL === currentlyRTL) return false;

  I18nManager.allowRTL(shouldRTL);
  I18nManager.forceRTL(shouldRTL);

  if (Platform.OS !== 'web') {
    return true;
  }
  return false;
}

export const RTL_RESTART_MESSAGE_KEY = 'language.rtlRestartMessage';
