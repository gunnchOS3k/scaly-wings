# Input Architecture

## Why abstraction matters

Games consume **logical actions** (`jump`, `leftFlipper`) instead of raw keys or gamepad indices — one mapping layer for touch, keyboard, and controllers.

## Layers

```
TouchAdapter → InputManager → Game screens
KeyboardAdapter (web) ↗
GamepadAdapter (web/native) ↗
```

## Files

| File | Role |
|------|------|
| `inputTypes.ts` | Actions, InputState, PlayerInputMap |
| `InputManager.ts` | Merge sources per player |
| `keyboardInput.web.ts` | Key codes → actions |
| `touchInput.ts` | Touch zones |
| `gamepadInput.web.ts` | Gamepad API |
| `gamepadInput.native.ts` | Stub + TODO |
| `useGameInput.ts` | React hook polling |

## Player assignment

`inputManager.assignGamepadToPlayer(1, index)` in Cocoon Console.

## UML

See updated `UML_CLASS_DIAGRAM.md` — InputManager, TouchAdapter, GamepadAdapter.

## How games consume input

```typescript
const input = useGameInput(1);
if (isPressed(input, 'flap')) { ... }
```
