# Missing Translations Tracker

Use this doc to track translation gaps — **not** invalid JSON comments.

## Status

Draft locale files (`ar`, `fr`, `es`, `fi`) were generated from `en.json` with **core navigation/UI patches** applied. Many longer strings (About body copy, checklist descriptions, probability topic paragraphs) may still be **English placeholders** inside draft JSON until human review.

## Priority fill order

1. `home.*`, `nav.*`, `settings.*`, `language.*`
2. `arcade.*`, `games.*` (Start, Pause, Game Over, Score)
3. `probability.concepts.*`, `probability.games.*`
4. `portfolio.*`, `about.*` section titles (body copy in `yasmineProfile.ts` remains English data layer)
5. `publish.*` checklist item descriptions
6. App store marketing strings (future)

## How to find missing keys

```bash
npm run i18n:check
```

Development console also warns: `[i18n] Missing translation: "key" (lang)`.

## Reviewers

| Locale | Owner |
|--------|-------|
| `ar` | Yasmine |
| `fr` | Yasmine |
| `es` | Edmund |
| `fi` | Edmund + Finnish native reviewer |

## TODO (human review)

- [ ] Arabic: full home + settings + arcade strings
- [ ] Arabic: RTL playtest on Pixel 6a after restart
- [ ] French: probability concept labels
- [ ] Spanish: publishing section headings
- [ ] Finnish: core navigation native-sounding copy
- [ ] All: game overlay strings in Pinball, Wing Run, Pupa Math Boost

When a section is reviewed, note the date and reviewer here.
