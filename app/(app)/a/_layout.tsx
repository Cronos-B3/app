import { useTheme } from 'contexts/ThemeContext';
import { Stack } from 'expo-router';

export default () => {
  const { colors } = useTheme();

  return (
    <Stack
      initialRouteName="home"
      screenListeners={{}}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
        freezeOnBlur: true
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="profile" />
    </Stack>
  );
};
