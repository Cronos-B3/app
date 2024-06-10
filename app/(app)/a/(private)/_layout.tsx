import { useTheme } from 'tamagui';
import { Tabs } from 'expo-router';
import TabBar from '@/components/organisms/TabBar';

export default () => {
  const { notInversedBackground: background } = useTheme();

  return (
    <Tabs
      tabBar={({ navigation, state, insets }) => (
        <TabBar navigation={navigation} tabIndex={state.index} insetBottom={insets.bottom} />
      )}
      sceneContainerStyle={{ backgroundColor: background.val }}
      screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};
