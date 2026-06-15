# Scaly Wings Localization Guide

Scaly Wings supports **five languages** to reflect the team's backgrounds and demonstrate global product thinking:

| Code | Language | Reviewer |
|------|----------|----------|
| `en` | English (source) | Edmund / Yasmine |
| `ar` | العربية | **Yasmine review required** |
| `fr` | Français | **Yasmine review required** |
| `es` | Español | **Edmund review required** |
| `fi` | Suomi | **Edmund learning — Finnish native review recommended** |

## Why these languages?

- **Yasmine** speaks Arabic and French.
- **Edmund** speaks Spanish and is learning Finnish.
- Together they model accessibility, internationalization, and cross-cultural UI design for recruiters.

## Where translations live

```
src/i18n/
  index.ts              # i18next init, setAppLanguage, device detection
  languages.ts          # Supported language metadata
  resources.ts          # JSON locale imports
  direction.ts          # RTL helpers
  storage.ts            # AsyncStorage persistence
  missingKeys.ts        # Dev missing-key logging
  LanguageProvider.tsx  # App-wide language context
  locales/
    en.json             # Source of truth
    ar.json fr.json es.json fi.json  # Draft translations
```

## Adding a new translation key

1. Add the key to `src/i18n/locales/en.json` (nested keys, not full sentences as keys).
2. Run `npm run i18n:check` — other locales may report missing keys (English fallback still works).
3. Update draft locale files or leave fallback until human review.
4. Use in UI:

```tsx
const { t } = useTranslation();
<Text>{t('home.title')}</Text>
```

Or:

```tsx
<LocalizedText i18nKey="home.title" />
```

## Adding a new language

1. Add metadata in `src/i18n/languages.ts`.
2. Create `src/i18n/locales/xx.json` with `_meta` block.
3. Register in `src/i18n/resources.ts`.
4. Add chip in `LanguageSwitcher` (automatic if in `supportedLanguages`).
5. Update `scripts/check-localization.js` targets array.
6. Document reviewer in `docs/TRANSLATION_REVIEW_WORKFLOW.md`.

## Fallback behavior

- Missing keys in a selected language **fall back to English**.
- Development mode logs missing keys via `src/i18n/missingKeys.ts`.
- The app **must not crash** on missing keys.

## Device language detection

On first launch (no saved preference):

1. `expo-localization` reads device locale.
2. If locale matches `en`, `ar`, `fr`, `es`, or `fi` → use it.
3. Otherwise → **English**.

## Saved language override

- Key: `@scaly-wings/language` in AsyncStorage.
- Set via Home or Settings language switcher.
- Reset via **Reset to device language** in Settings.

## Testing language switching

```bash
npm install
npm run expo:go
npm run i18n:check
```

- Open **Settings → Language test screen** for samples in all five languages.
- Switch to Arabic and verify RTL text alignment.
- Restart app to confirm persistence.

## Related docs

- [ARABIC_RTL_SUPPORT.md](./ARABIC_RTL_SUPPORT.md)
- [TRANSLATION_REVIEW_WORKFLOW.md](./TRANSLATION_REVIEW_WORKFLOW.md)
- [MISSING_TRANSLATIONS.md](./MISSING_TRANSLATIONS.md)
- [LANGUAGE_PORTFOLIO_STORY.md](./LANGUAGE_PORTFOLIO_STORY.md)
