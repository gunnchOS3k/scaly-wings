# Scaly Wings — Game Design Document

## Narrative

A butterfly’s life cycle — egg, larva, pupa, butterfly — mirrors learning: eat, grow, transform, fly. **Scaly Wings** turns that metaphor into arcade play and math practice for Yasmine’s portfolio.

## Target audience

- Yasmine (primary builder & player)
- Recruiters, professors, collaborators reviewing her work
- Friends/family on mobile browsers

## Games

### 1. Flutter Flight
- **Controls**: Tap / click / Space to flap
- **Goal**: Pass gates, avoid stems
- **States**: Start → Playing → Game Over
- **Scoring**: +1 per gate passed; local high score saved

### 2. Larva Leaf Race
- **Controls**: P1 WASD or left pad; P2 arrows or right pad
- **Goal**: Eat the most grid cells before timer
- **Scoring**: Percent of leaf grid eaten per larva
- **End**: Winner evolves (UI message)

### 3. Pupa Math Boost
- **Controls**: Type answer, submit
- **Goal**: Reach 100% metamorphosis
- **Scoring**: Correct answers boost multiplier and progress; wrong answers slow progress
- **Levels**: Easy / medium / hard filter (UI); problem bank in `mathProblems.ts`

## Progression

- Arcade hub unlocks all three games immediately (no paywall v1)
- High scores / best times encourage replay
- Portfolio pages document growth outside games

## Accessibility

- Large buttons and readable fonts
- Do not rely on color alone for game state (text overlays for start/game over)
- Reduced motion: consider disabling parallax/animations in future settings screen
- Screen reader labels on primary actions

## Future enhancements

- Online leaderboard (optional backend)
- Custom butterfly skins
- More math categories and spaced repetition
- Haptic feedback on flap (iOS)
- Settings: motion, sound, difficulty lock
