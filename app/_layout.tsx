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
        <Stack.Screen name="games/flutter-flight" options={{ title: 'Flutter Flight' }} />
        <Stack.Screen name="games/larva-leaf-race" options={{ title: 'Larva Leaf Race' }} />
        <Stack.Screen name="games/pupa-math-boost" options={{ title: 'Pupa Math Boost' }} />
      </Stack>
    </>
  );
}
