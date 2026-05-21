import { View, StyleSheet } from 'react-native';
import Svg, { Ellipse, Path, Circle } from 'react-native-svg';
import { colors } from '@/src/theme/colors';

interface ButterflyMascotProps {
  size?: number;
}

/** Simple vector butterfly — no copyrighted assets. */
export function ButterflyMascot({ size = 80 }: ButterflyMascotProps) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]} accessibilityLabel="Butterfly mascot">
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Ellipse cx="50" cy="55" rx="6" ry="22" fill={colors.charcoal} />
        <Path
          d="M50 35 Q20 20 15 45 Q25 60 50 50"
          fill={colors.hotPink}
          opacity={0.9}
        />
        <Path
          d="M50 35 Q80 20 85 45 Q75 60 50 50"
          fill={colors.purpleLight}
          opacity={0.9}
        />
        <Path
          d="M50 55 Q18 65 12 80 Q30 88 50 72"
          fill={colors.hotPinkLight}
          opacity={0.85}
        />
        <Path
          d="M50 55 Q82 65 88 80 Q70 88 50 72"
          fill={colors.purple}
          opacity={0.85}
        />
        <Circle cx="50" cy="28" r="5" fill={colors.black} />
        <Circle cx="47" cy="27" r="1.5" fill={colors.white} />
        <Circle cx="53" cy="27" r="1.5" fill={colors.white} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
});
