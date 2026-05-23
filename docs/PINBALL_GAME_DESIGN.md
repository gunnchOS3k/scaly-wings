# Scaly Wings Pinball — Game Design

## Inspiration

Nostalgic plug-and-play tabletop pinball toys (red flipper buttons, plunger launch, compact arcade energy) inspired the **control layout** — not brand names, logos, or copied art.

## Original theme

- Ball = **nectar pearl**
- Bumpers = flowers, vines, pollen multipliers
- Flippers = butterfly wings
- Table = glowing garden

## Controls

| Platform | Left flipper | Right flipper | Launch | Pause |
|----------|--------------|---------------|--------|-------|
| Touch | Lower left zone | Lower right | Launch zone | — |
| Keyboard | Z / ArrowLeft | C / ArrowRight | Space | Enter |
| Controller | L1/LB/L2 | R1/RB/R2 | A / Cross | Start |

## Physics model

- Gravity, drag, wall bounce (`pinballPhysics.ts`)
- Circle bumpers, flipper kick impulse
- Drain detection in center bottom

## Collision model

- Circle-circle bumper overlap resolution
- Flipper active window applies velocity kick

## Score

- Bumper multipliers add nectar points
- Lives (3) · local high score via AsyncStorage

## Future enhancements

- Rotating flipper geometry, sound, multiball, skill shot lanes

## Python recreation

See `docs/PYTHON_RECREATION_GUIDE.md` section A — pygame ball/flipper/bumper classes.
