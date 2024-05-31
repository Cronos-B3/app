import 'react-native-reanimated';

import { TamaguiProvider, useTheme } from 'tamagui';
import { ToastProvider } from '@tamagui/toast';
import { config } from '../tamagui.config';

import '../i18n';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

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

  return (
    <TamaguiProvider config={config} defaultTheme={'dark'}>
      <ToastProvider swipeDirection="horizontal" duration={3000}>
        <RootLayoutNav />
      </ToastProvider>
    </TamaguiProvider>
  );
}

function RootLayoutNav() {
  const theme = useTheme();

  return (
    <>
      <StatusBar style={theme.inversed_style.val as any} backgroundColor="transparent" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)/a" />
        <Stack.Screen name="(app)" />
      </Stack>
    </>
  );
}
