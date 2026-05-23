import { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenShell } from '@/src/components/ScreenShell';
import { inputManager } from '@/src/input/InputManager';
import { createGameLoop } from '@/src/utils/gameLoop';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export default function ControllerTestScreen() {
  const [pads, setPads] = useState<ReturnType<typeof inputManager.listGamepads>>([]);
  const [raw, setRaw] = useState<string>('');

  useEffect(() => {
    inputManager.init();
    const loop = createGameLoop(() => {
      setPads(inputManager.listGamepads());
      const r0 = inputManager.getGamepadRaw(0);
      const state = inputManager.getState(1);
      setRaw(
        JSON.stringify(
          {
            gamepad0: r0,
            normalizedP1: state.actions,
            moveX: state.moveX,
            maps: inputManager.getPlayerMaps(),
          },
          null,
          2
        )
      );
    });
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <ScreenShell scroll>
      <Text style={styles.title}>Controller Test</Text>
      <Text style={styles.sub}>Web: Gamepad API · Native: stub (see docs/CONTROLLER_SUPPORT.md)</Text>
      {pads.length === 0 ? (
        <Text style={styles.warn}>No gamepads detected. Press a button on connected controller.</Text>
      ) : (
        pads.map((p) => (
          <Text key={p.index} style={styles.line}>
            [{p.index}] {p.label} — {p.id}
          </Text>
        ))
      )}
      <Text style={styles.mono}>{raw}</Text>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.hotPink },
  sub: { color: colors.charcoal, marginBottom: spacing.md },
  warn: { color: colors.hotPinkDark, marginVertical: spacing.md },
  line: { color: colors.black, marginBottom: spacing.xs },
  mono: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.charcoal,
    marginTop: spacing.lg,
  },
});
