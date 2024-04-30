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
import useUser from 'hooks/useUser';
import useErrorHandling from 'hooks/useErrorHandling';

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

  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={gs.flex} scrollEnabled={false}>
        <ThemeProvider>
          <LayoutConfig />
        </ThemeProvider>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const LayoutConfig = () => {
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
      <StatusBar />
      <LayoutUser />
    </ToastProvider>
  );
};

const LayoutUser = () => {
  const { loadUser } = useUser();

  const [userLoaded, setUserLoaded] = useState<'LOADED' | 'ERROR' | 'UNLOADED'>(() => 'UNLOADED');
  const { handleError } = useErrorHandling();

  useEffect(() => {
    (async () => {
      if (userLoaded !== 'UNLOADED') return;
      try {
        await loadUser();
        setUserLoaded('LOADED');
      } catch (error) {
        setUserLoaded('ERROR');
        handleError(error);
      }
    })();

    if (userLoaded === 'UNLOADED') return;
    SplashScreen.hideAsync();
  }, [userLoaded]);

  if (userLoaded === 'UNLOADED') return null;
  if (userLoaded === 'ERROR') return <></>;

  return <LayoutNav />;
};

const LayoutNav = () => {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background }
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(app)" />
      <Stack.Screen name="(auth)/a" />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'transparentModal',
          animation: 'none',
          contentStyle: { backgroundColor: 'rgba(0, 0, 0, 0.6)' }
        }}
      />
    </Stack>
  );
};
