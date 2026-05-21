import { Text, StyleSheet, View } from 'react-native';
import { ScreenShell } from '@/src/components/ScreenShell';
import { iosChecklist, androidChecklist } from '@/src/data/appStoreChecklist';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

function ChecklistBlock({ title, items }: { title: string; items: typeof iosChecklist }) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>{title}</Text>
      {items.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text style={styles.itemTitle}>{item.done ? '☑' : '☐'} {item.title}</Text>
          <Text style={styles.itemDesc}>{item.description}</Text>
        </View>
      ))}
    </View>
  );
}

export default function PublishScreen() {
  return (
    <ScreenShell>
      <Text style={styles.heading}>Publishing Checklist</Text>
      <Text style={styles.sub}>
        Full details in docs/APP_STORE_READINESS.md and docs/ANDROID_PLAY_STORE_READINESS.md
      </Text>
      <ChecklistBlock title="iOS App Store" items={iosChecklist} />
      <ChecklistBlock title="Google Play" items={androidChecklist} />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.hotPink,
  },
  sub: { color: colors.charcoal, marginBottom: spacing.lg },
  block: { marginBottom: spacing.xl },
  blockTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.purple,
    marginBottom: spacing.md,
  },
  item: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  itemTitle: { fontWeight: typography.weights.semibold, color: colors.black },
  itemDesc: { color: colors.charcoal, marginTop: spacing.xs, fontSize: typography.sizes.sm },
});
