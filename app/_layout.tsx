import 'react-native-reanimated';

import { TamaguiProvider } from 'tamagui';
import { ToastProvider } from '@tamagui/toast';
import { config } from '../tamagui.config';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // These fonts are used by the TamaguiProvider.
  const [fontsLoaded, fontsFailed] = useFonts({
    Heebo: require('../assets/fonts/Heebo-Regular.ttf'),
    HeeboBold: require('../assets/fonts/Heebo-Bold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (fontsFailed) throw fontsFailed;
  }, [fontsFailed]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <TamaguiProvider config={config} defaultTheme={'dark'}>
      <ToastProvider swipeDirection="horizontal" duration={3000}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)/a" />
        </Stack>
      </ToastProvider>
    </TamaguiProvider>
  );
}
