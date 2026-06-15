import { Text, type TextProps, type TextStyle, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/src/i18n/useLanguage';

interface LocalizedTextProps extends Omit<TextProps, 'children'> {
  i18nKey: string;
  style?: TextStyle | TextStyle[];
  center?: boolean;
}

export function LocalizedText({ i18nKey, style, center, ...rest }: LocalizedTextProps) {
  const { t } = useTranslation();
  const { textAlign, isRTL } = useLanguage();

  return (
    <Text
      {...rest}
      style={[
        styles.base,
        { textAlign: center ? 'center' : textAlign, writingDirection: isRTL ? 'rtl' : 'ltr' },
        style,
      ]}
    >
      {t(i18nKey)}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {},
});
