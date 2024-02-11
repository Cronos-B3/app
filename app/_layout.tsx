import axios from 'axios';
import { ThemeProvider, useTheme } from 'contexts/ThemeContext';
import { TranslateProvider } from 'contexts/TranslateContext';
import { UserProvider } from 'contexts/UserContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Set the default headers for axios.
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  // Set the default base URL for axios.
  axios.defaults.baseURL = `${process.env.EXPO_PUBLIC_CRONOS_API ?? 'http://localhost'}/api`;

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  if (__DEV__) console.log('🥇 - RootLayoutNav');

  return (
    <UserProvider>
      <ThemeProvider>
        <TranslateProvider>
          <SafeAreaProvider>
            <Layout />
          </SafeAreaProvider>
        </TranslateProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

const Layout = () => {
  if (__DEV__) console.log('🥈 - Layout');

  const { colors } = useTheme();

  return (
    <>
      <StatusBar style={colors.status_bar as StatusBarStyle} backgroundColor={colors.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background }
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(app)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </>
  );
};
