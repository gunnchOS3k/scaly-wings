const reported = new Set<string>();

export function logMissingTranslationKey(key: string, language: string): void {
  if (!__DEV__) return;
  const id = `${language}:${key}`;
  if (reported.has(id)) return;
  reported.add(id);
  console.warn(`[i18n] Missing translation: "${key}" (${language}) — falling back to English`);
}

export function resetMissingKeyLog(): void {
  reported.clear();
}
