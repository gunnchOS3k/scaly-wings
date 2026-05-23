import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/src/theme/colors';

export default function RootLayout() {
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
        <Stack.Screen name="arcade" options={{ title: 'Arcade' }} />
        <Stack.Screen name="about-yasmine" options={{ title: 'About Yasmine' }} />
        <Stack.Screen name="portfolio" options={{ title: 'Portfolio' }} />
        <Stack.Screen name="publish" options={{ title: 'Publishing' }} />
        <Stack.Screen name="python-recreation" options={{ title: 'Python Guide' }} />
        <Stack.Screen name="probability-wing" options={{ title: 'Probability Wing' }} />
        <Stack.Screen name="cocoon-console" options={{ title: 'Cocoon Console' }} />
        <Stack.Screen name="controller-test" options={{ title: 'Controller Test' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
        <Stack.Screen name="games/pinball" options={{ title: 'Scaly Wings Pinball' }} />
        <Stack.Screen name="games/wing-run" options={{ title: 'Wing Run' }} />
        <Stack.Screen name="games/flutter-flight" options={{ title: 'Flutter Flight' }} />
        <Stack.Screen
          name="games/probability-wing/chance-garden"
          options={{ title: 'Chance Garden' }}
        />
        <Stack.Screen
          name="games/probability-wing/noise-nectar"
          options={{ title: 'Noise Nectar' }}
        />
        <Stack.Screen
          name="games/probability-wing/poisson-pond"
          options={{ title: 'Poisson Pond' }}
        />
        <Stack.Screen name="games/larva-leaf-race" options={{ title: 'Larva Leaf Race' }} />
        <Stack.Screen name="games/pupa-math-boost" options={{ title: 'Pupa Math Boost' }} />
      </Stack>
    </>
  );
}
