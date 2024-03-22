import TabBar from 'components/organisms/TabBar/TabBar';
import { Redirect, Stack } from 'expo-router';
import { useTokenStore } from 'hooks/store/useTokenStore';

export default () => {
  const { token } = useTokenStore();

  if (!token) return <Redirect href="/a/login" />;

  return (
    <>
      <Stack
        initialRouteName="a"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' }
        }}
      >
        <Stack.Screen name="a" />
        <Stack.Screen name="[profile]" />
      </Stack>
      <TabBar />
    </>
  );
};
