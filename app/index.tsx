import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenShell } from '@/src/components/ScreenShell';
import { ButterflyMascot } from '@/src/components/ButterflyMascot';
import { HotPinkButton } from '@/src/components/HotPinkButton';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScreenShell>
      <View style={styles.hero}>
        <ButterflyMascot size={100} />
        <Text style={styles.title}>Scaly Wings</Text>
        <Text style={styles.subtitle}>
          A butterfly arcade, math lab, and portfolio for Yasmine Dweir
        </Text>
        <Text style={styles.credit}>
          A Lepidoptera Lead Adventure · Yasmine Dweir & gunnchOS3k MLV
        </Text>
      </View>
      <HotPinkButton label="Play Arcade" onPress={() => router.push('/arcade')} />
      <HotPinkButton
        label="Probability Wing"
        onPress={() => router.push('/probability-wing')}
      />
      <HotPinkButton
        label="About Yasmine"
        variant="secondary"
        onPress={() => router.push('/about-yasmine')}
      />
      <HotPinkButton
        label="Portfolio"
        variant="secondary"
        onPress={() => router.push('/portfolio')}
      />
      <HotPinkButton
        label="Python Recreation Guide"
        variant="secondary"
        onPress={() => router.push('/python-recreation')}
      />
      <HotPinkButton
        label="Publishing Checklist"
        variant="secondary"
        onPress={() => router.push('/publish')}
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', marginBottom: spacing.xl },
  title: {
    fontSize: typography.sizes.hero,
    fontWeight: typography.weights.bold,
    color: colors.hotPink,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.black,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 28,
  },
  credit: {
    fontSize: typography.sizes.sm,
    color: colors.charcoal,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});
