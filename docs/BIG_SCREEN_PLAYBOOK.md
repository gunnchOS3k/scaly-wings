# Big Screen Playbook

## Android → HDMI / USB-C

1. Check phone specs for DisplayPort Alt Mode / HDMI alt mode
2. Use USB-C to HDMI adapter or dock
3. If no wired support, use wireless casting (Miracast, manufacturer cast)
4. Open Scaly Wings in landscape
5. Pair Bluetooth controller to phone

**Note:** App cannot enable port — hardware/OS dependent.

## iPhone → external display

1. Lightning/USB-C to HDMI adapter (supported models)
2. Or AirPlay to Apple TV
3. Landscape orientation recommended
4. MFi or Bluetooth controller

## Browser on TV

1. `npm run web` on desktop or cast browser tab
2. Chrome + USB gamepad
3. Full-screen browser (F11)

## Controller pairing

1. Put controller in pairing mode
2. Connect in phone Settings → Bluetooth
3. Open `/controller-test` then game

## Troubleshooting

- No gamepad: press any button while tab focused (web)
- Lag: prefer wired HDMI over wireless cast
- Wrong player: reassign in Cocoon Console Mode

## Latency

Expect 50–150ms on wireless cast; wired HDMI usually lower.
