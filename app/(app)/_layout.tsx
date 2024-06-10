import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';

export default () => {
  const { notInversedBackground: background } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: background.val },
      }}>
      <Stack.Screen name="a/(modal)" />
      <Stack.Screen name="a/(private)" />
      <Stack.Screen name="(public)" />
    </Stack>
  );
};
