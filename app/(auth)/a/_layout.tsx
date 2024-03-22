import AuthBottomInfos from 'components/organisms/AuthBottomInfos/AuthBottomInfos';
import AuthHeader from 'components/organisms/AuthHeader/AuthHeader';
import { DEVICE } from 'constants/config';
import { useTheme } from 'contexts/ThemeContext';
import { Redirect, Stack } from 'expo-router';
import { useTokenStore } from 'hooks/store/useTokenStore';
import { Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default () => {
  const { colors } = useTheme();
  const { token } = useTokenStore();
  const { bottom } = useSafeAreaInsets();

  if (token) return <Redirect href="/a/home" />;

  return (
    <>
      <AuthHeader />
      <Stack
        initialRouteName="login"
        screenOptions={{
          headerShown: false,
          presentation: 'card',
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
      <AuthBottomInfos style={[{ marginBottom: bottom }, s.bottomInfosContainer]} />
    </>
  );
};

const s = StyleSheet.create({
  headerContainer: {
    paddingTop: '4%',
    height: DEVICE.height * 0.25,
    width: '100%'
  },
  arrowContainer: {
    position: 'absolute',
    height: '15%',
    aspectRatio: 1,
    left: '10%',
    top: '10%'
  },
  logoContainer: {
    height: DEVICE.height * 0.25
  },
  logo: { flex: 1, marginTop: '10%' },
  headerText: {
    flex: 0.25,
    alignItems: 'center'
  },
  headerTextContent: { fontSize: 28 },
  bottomInfosContainer: {
    paddingBottom: Platform.OS === 'android' ? '5%' : 0
  }
});
