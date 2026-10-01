import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Alert } from 'react-native';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n, {
  getDeviceLanguage,
  getSavedLanguage,
  initI18n,
  resetToDeviceLanguage,
  setAppLanguage,
} from './index';
import { getLanguageMeta, supportedLanguages } from './languages';
import { getTextAlignForLanguage, getWritingDirection, isLanguageRTL } from './direction';
import type { LanguageCode } from './types';

interface LanguageContextValue {
  ready: boolean;
  currentLanguage: LanguageCode;
  languageDirection: 'ltr' | 'rtl';
  isRTL: boolean;
  textAlign: 'left' | 'right' | 'center';
  deviceLanguage: LanguageCode;
  savedLanguage: LanguageCode | null;
  supportedLanguages: typeof supportedLanguages;
  setLanguage: (code: LanguageCode) => Promise<void>;
  resetLanguage: () => Promise<void>;
  t: ReturnType<typeof useTranslation>['t'];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function LanguageContextBridge({ children }: { children: ReactNode }) {
  const { t, i18n: i18nInstance } = useTranslation();
  const [ready, setReady] = useState(true);
  const [savedLanguage, setSavedLanguage] = useState<LanguageCode | null>(null);
  const [deviceLanguage, setDeviceLanguage] = useState<LanguageCode>('en');
  const currentLanguage = (i18nInstance.language?.split('-')[0] ?? 'en') as LanguageCode;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await initI18n();
        const saved = await getSavedLanguage();
        if (!mounted) return;
        setSavedLanguage(saved);
        setDeviceLanguage(getDeviceLanguage());
      } catch {
        // Keep the synchronous English shell if device storage or locale APIs fail.
      } finally {
        if (mounted) setReady(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const setLanguage = useCallback(async (code: LanguageCode) => {
    const { needsRestart } = await setAppLanguage(code);
    setSavedLanguage(code);
    if (needsRestart) {
      Alert.alert(
        getLanguageMeta(code).nativeName,
        t('language.rtlRestartMessage')
      );
    }
  }, [t]);

  const resetLanguage = useCallback(async () => {
    const { needsRestart } = await resetToDeviceLanguage();
    setSavedLanguage(null);
    if (needsRestart) {
      Alert.alert(t('settings.resetToDevice'), t('language.rtlRestartMessage'));
    }
  }, [t]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      ready,
      currentLanguage,
      languageDirection: getWritingDirection(currentLanguage),
      isRTL: isLanguageRTL(currentLanguage),
      textAlign: getTextAlignForLanguage(currentLanguage),
      deviceLanguage,
      savedLanguage,
      supportedLanguages,
      setLanguage,
      resetLanguage,
      t,
    }),
    [ready, currentLanguage, deviceLanguage, savedLanguage, setLanguage, resetLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContextBridge>{children}</LanguageContextBridge>
    </I18nextProvider>
  );
}

export function useLanguageContext(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguageContext must be used within LanguageProvider');
  return ctx;
}
