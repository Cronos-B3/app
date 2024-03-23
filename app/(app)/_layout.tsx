import TabBar from 'components/organisms/TabBar/TabBar';
import { useTheme } from 'contexts/ThemeContext';
import { Redirect, Stack } from 'expo-router';
import { useTokenStore } from 'hooks/store/useTokenStore';

export default () => {
  const { token } = useTokenStore();

  if (!token) return <Redirect href="/a/login" />;

  const { colors } = useTheme();

  return (
    <>
      <Stack
        initialRouteName="a"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="a" />
        <Stack.Screen name="[profile]" />
      </Stack>
      <TabBar />
    </>
  );
};
