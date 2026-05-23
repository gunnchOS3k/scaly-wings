# Wing Run: Nectar Valley — Side-Scroller Design

## Original concept

**Wing Run** is an original butterfly platformer — inspired by the *feeling* of classic 2D side-scrollers, **not** Mario/Nintendo assets, names, enemies, or layouts.

## Protagonist & world

- **Butterfly** hero in Nectar Valley
- Platforms: leaves, branches, petals
- Collectibles: pollen, nectar, wing sparkles
- Hazards: webs, frogs, wind, thorns (original names)
- Power-ups (future): Glide Bloom, Probability Petal, Hot Pink Dash, Cocoon Shield

## Level 1: Petal Path 1-1

Tutorial: move, flap, glide, collect, avoid web, probability gate, chrysalis goal.

## Math gate

- Prompt: P(even die) = 0.5
- Correct → shortcut flag + bonus score
- Wrong → continue on main path (no harsh fail)

## Controls

Touch pads + keyboard (WASD/arrows) + gamepad sticks/buttons per `INPUT_ARCHITECTURE.md`.

## Accessibility

Large touch buttons, readable contrast, no color-only hazards (shapes/icons).

## Python recreation

pygame: player rect, platform list, camera offset, `levelData` as JSON.
