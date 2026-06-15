import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { LanguageProvider } from '@/src/i18n/LanguageProvider';
import { colors } from '@/src/theme/colors';

function LocalizedStack() {
  const { t } = useTranslation();

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.cream },
          headerTintColor: colors.hotPink,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.cream },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="arcade" options={{ title: t('nav.arcade') }} />
        <Stack.Screen name="about-yasmine" options={{ title: t('nav.aboutYasmine') }} />
        <Stack.Screen name="portfolio" options={{ title: t('nav.portfolio') }} />
        <Stack.Screen name="publish" options={{ title: t('nav.publishing') }} />
        <Stack.Screen name="python-recreation" options={{ title: t('nav.pythonGuide') }} />
        <Stack.Screen name="probability-wing" options={{ title: t('nav.probabilityWing') }} />
        <Stack.Screen name="cocoon-console" options={{ title: t('nav.cocoonConsole') }} />
        <Stack.Screen name="controller-test" options={{ title: t('nav.controllerTest') }} />
        <Stack.Screen name="settings" options={{ title: t('nav.settings') }} />
        <Stack.Screen name="language-test" options={{ title: t('nav.languageTest') }} />
        <Stack.Screen name="games/pinball" options={{ title: t('nav.pinball') }} />
        <Stack.Screen name="games/wing-run" options={{ title: t('nav.wingRun') }} />
        <Stack.Screen name="games/flutter-flight" options={{ title: t('nav.flutterFlight') }} />
        <Stack.Screen
          name="games/probability-wing/chance-garden"
          options={{ title: t('nav.chanceGarden') }}
        />
        <Stack.Screen
          name="games/probability-wing/noise-nectar"
          options={{ title: t('nav.noiseNectar') }}
        />
        <Stack.Screen
          name="games/probability-wing/poisson-pond"
          options={{ title: t('nav.poissonPond') }}
        />
        <Stack.Screen name="games/larva-leaf-race" options={{ title: t('nav.larvaLeafRace') }} />
        <Stack.Screen name="games/pupa-math-boost" options={{ title: t('nav.pupaMathBoost') }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <LocalizedStack />
    </LanguageProvider>
  );
}
