# Translation Review Workflow

Draft translations in Scaly Wings are **good-faith starters**, not final copy. Each locale file includes:

```json
"_meta": {
  "language": "Arabic",
  "status": "draft-human-review-required",
  "reviewer": "Yasmine review required"
}
```

## Review ownership

| Language | Primary reviewer | Notes |
|----------|------------------|-------|
| English (`en`) | Edmund / Yasmine | Source language |
| Arabic (`ar`) | **Yasmine** | RTL visual check required |
| French (`fr`) | **Yasmine** | Accent marks, formal vs informal tone |
| Spanish (`es`) | **Edmund** | Latin American vs Spain variants — pick one style |
| Finnish (`fi`) | **Edmund** (learning) | **Finnish native review recommended** |

## Review checklist

- [ ] Navigation labels reviewed (Home, Arcade, Settings)
- [ ] Game labels reviewed (Start, Pause, Game Over, Score)
- [ ] Portfolio / About section **titles** reviewed
- [ ] Probability Wing concept labels reviewed
- [ ] Publishing checklist headings reviewed
- [ ] App store marketing text reviewed (when added)
- [ ] Arabic RTL visual check completed
- [ ] Accent marks and diacritics checked (fr, es)
- [ ] Long text wrapping checked on small phones
- [ ] Cocoon Console / controller strings reviewed

## How to review

1. Run `npm run expo:go` and switch language in Home or Settings.
2. Open **Settings → Language test screen** for side-by-side samples.
3. Edit `src/i18n/locales/xx.json` directly.
4. Run `npm run i18n:check` after edits.
5. Update `_meta.status` to `reviewed` only after human sign-off (future).

## Filling gaps

See [MISSING_TRANSLATIONS.md](./MISSING_TRANSLATIONS.md) for keys still in English inside draft files.

Do not put TODO comments inside JSON — track gaps in the markdown doc instead.
