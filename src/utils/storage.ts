import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = '@scaly_wings:';

export async function saveScore(key: string, value: number): Promise<void> {
  await AsyncStorage.setItem(`${PREFIX}${key}`, String(value));
}

export async function loadScore(key: string, defaultValue = 0): Promise<number> {
  const raw = await AsyncStorage.getItem(`${PREFIX}${key}`);
  if (raw == null) return defaultValue;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : defaultValue;
}

export async function saveString(key: string, value: string): Promise<void> {
  await AsyncStorage.setItem(`${PREFIX}${key}`, value);
}

export async function loadString(key: string, defaultValue = ''): Promise<string> {
  const raw = await AsyncStorage.getItem(`${PREFIX}${key}`);
  return raw ?? defaultValue;
}
