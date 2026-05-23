# Cocoon Console Mode

## What it is

Cocoon Console Mode lets Scaly Wings feel like a **phone-based console**:

1. **Handheld** — portrait, touch-first
2. **Tabletop** — shared device, split touch or 2 controllers
3. **Big Screen** — landscape + OS mirroring/HDMI when hardware supports it

## Controller use

- Assign gamepad 1 / 2 in Cocoon Console screen
- Web: Gamepad API (PS5 DualSense, Xbox, generic)
- Native: stub documented in `gamepadInput.native.ts`

## Device limitations

- Scaly Wings **cannot force** USB-C HDMI — depends on phone SoC (DisplayPort Alt Mode)
- iPhone external display varies by model/iOS
- Browser controller support requires Gamepad API (Chrome recommended)

## Recruiter relevance

Shows product thinking: multi-modal play, honest hardware docs, controller abstraction, local multiplayer design.

See also: `BIG_SCREEN_PLAYBOOK.md`, `CONTROLLER_SUPPORT.md`, `LOCAL_MULTIPLAYER_DESIGN.md`.
