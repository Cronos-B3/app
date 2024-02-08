import { ThemeProvider, useTheme } from 'contexts/ThemeContext';
import { TranslateProvider } from 'contexts/TranslateContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { useEffect } from 'react';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'login'
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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider>
      <TranslateProvider>
        <Layout />
      </TranslateProvider>
    </ThemeProvider>
  );
}

const Layout = () => {
  const { colors } = useTheme();

  return (
    <>
      <StatusBar style={colors.status_bar as StatusBarStyle} backgroundColor={colors.background} />
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="(app)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
};
