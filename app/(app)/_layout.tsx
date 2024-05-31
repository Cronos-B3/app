import { Stack } from 'expo-router';

export default () => {
  return (
    <Stack>
      <Stack.Screen name="a/(modal)" />
      <Stack.Screen name="a/(private)" />
      <Stack.Screen name="(public)" />
    </Stack>
  );
};
