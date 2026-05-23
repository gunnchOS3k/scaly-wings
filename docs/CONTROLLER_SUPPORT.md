# Controller Support

## Target mappings

### PS5 DualSense (web Gamepad API)

| Action | Button |
|--------|--------|
| Jump / Launch / Confirm | Cross (0) |
| Dash | Square (2) |
| Glide | Circle (1) or R2 |
| Left flipper | L1 (4) or L2 |
| Right flipper | R1 (5) or R2 |
| Pause | Options (9) |
| Move | Left stick / D-pad |

### Xbox Series

Same standard mapping (A=0, X=2, B=1, LB/RB, Start).

## Web

- Implemented in `src/input/gamepadInput.web.ts`
- Poll in `requestAnimationFrame` via `useGameInput`
- Test at `/controller-test`

## Android

- USB OTG / Bluetooth controllers often work in native games
- Expo Go: limited — use touch fallback; custom dev build + native module for full support

## iOS

- Game Controller framework via future native bridge
- Current: touch-first

## Testing checklist

- [ ] Connect controller before opening game
- [ ] Press button to wake Gamepad API (web)
- [ ] Verify `/controller-test` shows button presses
- [ ] Pinball flippers respond
- [ ] Wing Run movement + jump

## Known limitations

- Native gamepad stub returns empty on iOS/Android Expo Go
- No rumble/haptics yet (settings placeholder)

## Future native module plan

Bridge GCController / Android InputDevice to `InputManager.pollGamepad()`.
