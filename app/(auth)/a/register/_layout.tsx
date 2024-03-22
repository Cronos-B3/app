import { useTheme } from 'contexts/ThemeContext';
import { Stack } from 'expo-router';

export default () => {
  const { colors } = useTheme();

  return (
    <Stack
      initialRouteName="policies"
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="policies" />
      <Stack.Screen name="private-data" />
      <Stack.Screen name="public-data" />
    </Stack>
  );
};
