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
      <Stack.Screen
        name="a/(modal)"
        options={{
          animation: 'none',
          presentation: 'transparentModal',
          contentStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        }}
      />
      <Stack.Screen name="a/(private)" />
      <Stack.Screen name="(public)" />
    </Stack>
  );
};
