# Arabic RTL Support in Scaly Wings

Arabic (`ar`) is a **right-to-left (RTL)** language. Scaly Wings handles RTL at two levels:

1. **Text direction** — `LocalizedText`, language-aware `textAlign`, `writingDirection`.
2. **Native layout** — `I18nManager` via `maybeApplyRTL()` when Arabic is selected.

## Rules for contributors

### Prefer start/end over left/right

```tsx
// Good
paddingStart: spacing.md,
borderStartWidth: 4,
marginEnd: spacing.sm,

// Avoid when possible
paddingLeft, marginRight, borderLeftWidth
```

### Icons and arrows

- Back chevrons and directional icons may need mirroring in RTL.
- **Game controls** (left/right movement) should remain **physically intuitive** — do not flip gameplay left/right without playtesting.

### Arabic layout restart

Switching **into or out of** Arabic may require a native app restart for `I18nManager` changes to fully apply. The app shows:

> Restart Scaly Wings to fully apply Arabic layout direction.

We do **not** force RTL silently in production without this notice.

## What to test

| Surface | Check |
|---------|--------|
| Home / Settings | Language chips, section titles align right |
| Portfolio / About | Long paragraphs wrap correctly |
| Arcade cards | Title and badges readable |
| Arabic sample block | `language-test` screen RTL block |
| Games | Movement still feels correct |
| Web | Browser RTL + RN Web text direction |
| Android / iOS | Restart after Arabic switch |

## Implementation files

- `src/i18n/direction.ts` — `isLanguageRTL`, `getTextAlignForLanguage`, `maybeApplyRTL`
- `src/i18n/LanguageProvider.tsx` — restart alert on Arabic switch
- `src/components/LocalizedText.tsx` — per-language text alignment

## Human review

All Arabic strings are **draft** until **Yasmine** reviews them. Machine-assisted drafts are not final copy.
