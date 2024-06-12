import React, { useEffect } from 'react';
import { DEVICE } from '@/constants/config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Stack, YStack, YStackProps } from 'tamagui';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Text from '../atoms/Text';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { router } from 'expo-router';

type ModalTemplateProps = {
  title?: string;
  height?: number;
} & Omit<YStackProps, 'bottom'>;

const ModalTemplate = YStack.styleable<ModalTemplateProps>(({ children, title, height = 50, ...props }, ref) => {
  const { bottom: insetBottom } = useSafeAreaInsets();

  const modalHeight = (DEVICE.height * height) / 100 + insetBottom;

  const translateY = useSharedValue(modalHeight);

  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 350,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[{ height: modalHeight, paddingBottom: insetBottom }, animatedStyle]}>
      <YStack
        backgroundColor={'$modalBackground'}
        {...props}
        flex={1}
        ref={ref}
        borderTopLeftRadius={'$6'}
        borderTopRightRadius={'$6'}>
        <Button
          color={'$inversed'}
          icon={<ArrowLeft size={'$6'} />}
          position="absolute"
          top={DEVICE.height * 0.05}
          left={'5%'}
          onPress={() => router.back()}
        />
        {title && (
          <Stack height={DEVICE.height * 0.1} justifyContent="center" alignItems="center">
            <Text fontSize={'$8'} fontFamily={'$bold'}>
              {title}
            </Text>
          </Stack>
        )}
        <YStack flex={1}>{children}</YStack>
      </YStack>
    </Animated.View>
  );
});

ModalTemplate.displayName = 'ModalTemplate';

export default ModalTemplate;
