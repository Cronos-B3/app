import { useTheme } from 'tamagui';
import { Tabs } from 'expo-router';
import TabBar from '@/components/organisms/TabBar';
import useAppApi from '@/hooks/api/useAppApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default () => {
  const { notInversedBackground: background } = useTheme();

  const { getMe } = useAppApi();

  const { data: userData, error } = useQuery({
    queryKey: getMe.queryKey,
    queryFn: getMe.process,
    retry: false,
  });

  useEffect(() => {
    if (!userData) return;
    getMe.onSuccess(userData);
  }, [userData]);

  useEffect(() => {
    if (!error || !getMe.onError) return;
    getMe.onError(error);
  }, [error]);

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
