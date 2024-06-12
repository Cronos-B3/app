import { router, Stack } from 'expo-router';
import { useTheme, YStack } from 'tamagui';

export default () => {
  const { notInversedBackground: background, notInversed50: backgroundModal } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: background.val },
      }}>
      <Stack.Screen
        name="a/(menu)"
        options={{
          animation: 'none',
          presentation: 'transparentModal',
          contentStyle: { backgroundColor: backgroundModal.val },
        }}
      />
      <Stack.Screen name="a/(private)" />
      <Stack.Screen name="(public)" />
    </Stack>
  );
};
