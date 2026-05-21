import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import type { PortfolioProject } from '@/src/data/portfolioProjects';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface PortfolioCardProps {
  project: PortfolioProject;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  const openLink = () => {
    if (project.link) Linking.openURL(project.link);
  };

  return (
    <View style={[styles.card, project.featured && styles.featured]}>
      {project.featured && <Text style={styles.badge}>Featured</Text>}
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.role}>{project.role}</Text>
      <Text style={styles.stack}>{project.stack.join(' · ')}</Text>
      <Text style={styles.body}>{project.problemSolved}</Text>
      <Text style={styles.label}>Skills demonstrated</Text>
      {project.skillsDemonstrated.map((s) => (
        <Text key={s} style={styles.bullet}>
          • {s}
        </Text>
      ))}
      <View style={styles.keywords}>
        {project.recruiterKeywords.map((k) => (
          <Text key={k} style={styles.keyword}>
            {k}
          </Text>
        ))}
      </View>
      {project.link ? (
        <Pressable onPress={openLink} accessibilityRole="link">
          <Text style={styles.link}>View project →</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.creamDark,
  },
  featured: { borderColor: colors.hotPink, borderWidth: 2 },
  badge: {
    color: colors.hotPink,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.black,
  },
  role: { color: colors.purple, marginTop: spacing.xs },
  stack: { color: colors.charcoal, fontSize: typography.sizes.sm, marginTop: spacing.xs },
  body: { marginTop: spacing.md, color: colors.black, lineHeight: 22 },
  label: {
    marginTop: spacing.md,
    fontWeight: typography.weights.semibold,
    color: colors.hotPinkDark,
  },
  bullet: { color: colors.charcoal, marginTop: spacing.xs },
  keywords: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.md, gap: spacing.sm },
  keyword: {
    backgroundColor: colors.cream,
    color: colors.purple,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    fontSize: typography.sizes.xs,
    overflow: 'hidden',
  },
  link: {
    marginTop: spacing.md,
    color: colors.hotPink,
    fontWeight: typography.weights.bold,
  },
});
