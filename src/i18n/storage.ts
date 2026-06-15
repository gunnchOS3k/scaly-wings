import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANGUAGE_STORAGE_KEY, isSupportedLanguage } from './languages';
import type { LanguageCode } from './types';

export async function getSavedLanguage(): Promise<LanguageCode | null> {
  try {
    const raw = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (raw && isSupportedLanguage(raw)) return raw;
  } catch {
    // ignore read errors — fall back to device language
  }
  return null;
}

export async function saveLanguage(code: LanguageCode): Promise<void> {
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, code);
}

export async function clearSavedLanguage(): Promise<void> {
  await AsyncStorage.removeItem(LANGUAGE_STORAGE_KEY);
}
