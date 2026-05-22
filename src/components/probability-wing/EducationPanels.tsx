import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface EducationPanelsProps {
  learning: string[];
  data: { label: string; value: string }[];
  python: string[];
  recruiter: string[];
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{title}</Text>
      {children}
    </View>
  );
}

export function EducationPanels({ learning, data, python, recruiter }: EducationPanelsProps) {
  return (
    <View style={styles.wrap}>
      <Panel title="Learning Mode — What Yasmine Can Explain">
        {learning.map((line) => (
          <Text key={line} style={styles.line}>
            • {line}
          </Text>
        ))}
      </Panel>
      <Panel title="Data Panel — Theory vs Experiment">
        {data.map((row) => (
          <View key={row.label} style={styles.dataRow}>
            <Text style={styles.dataLabel}>{row.label}</Text>
            <Text style={styles.dataValue}>{row.value}</Text>
          </View>
        ))}
      </Panel>
      <Panel title="Python Bridge">
        {python.map((line) => (
          <Text key={line} style={styles.mono}>
            {line}
          </Text>
        ))}
      </Panel>
      <Panel title="Recruiter Signal">
        {recruiter.map((line) => (
          <Text key={line} style={styles.line}>
            • {line}
          </Text>
        ))}
      </Panel>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: spacing.lg },
  panel: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.creamDark,
  },
  panelTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.purple,
    marginBottom: spacing.sm,
  },
  line: { color: colors.charcoal, lineHeight: 22, marginBottom: spacing.xs },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
    flexWrap: 'wrap',
  },
  dataLabel: { color: colors.charcoal, flex: 1 },
  dataValue: { fontWeight: typography.weights.bold, color: colors.hotPink },
  mono: {
    fontFamily: 'monospace',
    fontSize: typography.sizes.xs,
    color: colors.black,
    marginBottom: spacing.xs,
  },
});
