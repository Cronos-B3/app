import { RegisterProvider } from '@/contexts/RegisterContext';
import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';

export default () => {
  const { not_inversed_background: background } = useTheme();

  return (
    <RegisterProvider>
      <Stack
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
          contentStyle: { backgroundColor: background.val },
        }}>
        <Stack.Screen name="policies" />
        <Stack.Screen name="private-data" />
        <Stack.Screen name="public-data" />
      </Stack>
    </RegisterProvider>
  );
};
