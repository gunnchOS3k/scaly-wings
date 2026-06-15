# Language Portfolio Story

Multilingual support turns Scaly Wings from a student arcade into a **recruiter-ready global product demo**.

## Signals for Yasmine's profile

- **Internationalization (i18n)** — structured translation keys, not hardcoded UI strings
- **Localization (l10n)** — five real languages with human review workflow
- **Accessibility** — readable text direction, large language switcher touch targets
- **RTL support** — Arabic layout considerations on mobile and web
- **Global product thinking** — device locale detection + persistent user preference
- **Cross-cultural UI design** — native language names (العربية, Français, Español, Suomi)
- **Technical communication** — docs for reviewers, check scripts, missing-key fallbacks

## Team narrative

| Person | Languages | Role in review |
|--------|-----------|----------------|
| Yasmine | Arabic, French | Reviews ar + fr drafts |
| Edmund | Spanish, Finnish (learning) | Reviews es; studies fi with native review goal |

## Resume bullets (earned after implementation)

- Implemented multilingual support in a cross-platform Expo/React Native app using structured translation files, device locale detection, and persistent language preferences.
- Added Arabic right-to-left layout support and localization review workflow for a mobile-first educational game portfolio.
- Built a language switcher supporting English, Arabic, French, Spanish, and Finnish across web, Android, and iOS.
- Designed a translation review process connecting technical implementation with human language review and accessibility testing.

## Where to demo in the app

1. **Home** — compact language switcher at top
2. **Settings** — full language section + device locale info
3. **Portfolio** — "Languages represented in Scaly Wings"
4. **Language test** — `/language-test` samples all five languages

## Commands for recruiters / professors

```bash
npm run i18n:check    # structural locale validation
npm run expo:go       # live language switching
```
