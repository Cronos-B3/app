import TabBar from 'components/organisms/TabBar/TabBar';
import { Stack } from 'expo-router';

export default () => {
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
