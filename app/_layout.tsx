import { ThemeProvider, useTheme } from 'contexts/ThemeContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import setAxiosDefault from 'lib/setAxiosDefault';
import { useEffect, useState } from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import 'intl-pluralrules';
import '../i18n';
import { ScrollView } from 'react-native';
import StatusBar from 'components/atoms/StatusBar/StatusBar';
import { gs } from 'constants/styles';
import { useTokenStore } from 'hooks/store/useTokenStore';
import { useUserStore } from 'hooks/store/useUserStore';
import { useAPI } from 'hooks/useAPI';
import { v1 } from 'lib/api/backendRoutes';
import convertUser from 'lib/convertDataDB/convertUser';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index'
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Heebo_bold: require('../assets/fonts/Heebo-Bold.ttf'),
    Heebo_regular: require('../assets/fonts/Heebo-Regular.ttf')
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  setAxiosDefault();

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { token } = useTokenStore();
  const { setUser } = useUserStore();
  const { call } = useAPI();

  const [userLoaded, setUserLoaded] = useState<boolean>(() => (token ? false : true));

  useEffect(() => {
    if (userLoaded) return;

    (async () => {
      if (__DEV__) console.log('🙌 - anonymous function');

      if (!token) {
        setUserLoaded(true);
        return;
      }

      const { users } = await call(v1.users.get({ token }));

      setUser(convertUser(users));
      setUserLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!userLoaded) return;
    SplashScreen.hideAsync();
  }, [userLoaded]);

  if (!userLoaded) return null;

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar />
        <ScrollView contentContainerStyle={gs.flex} scrollEnabled={false}>
          <Layout />
        </ScrollView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const Layout = () => {
  const { colors } = useTheme();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <ToastProvider
      placement="bottom"
      offset={top + 30}
      offsetBottom={bottom + 30}
      duration={6000}
      animationType="slide-in"
      animationDuration={500}
      swipeEnabled={true}
      dangerColor={colors.error}
      style={{ borderRadius: 9, paddingHorizontal: '8%', paddingVertical: '2.5%' }}
      textStyle={{ color: colors.light, textAlign: 'center' }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background }
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(app)" />
        <Stack.Screen name="(auth)/a" />
      </Stack>
    </ToastProvider>
  );
};
