import { DEVICE } from '@/constants/config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Stack, YStack, YStackProps } from 'tamagui';
import Text from '../atoms/Text';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import { Keyboard } from 'react-native';

type ModalTemplateProps = {
  title?: string;
  height?: number;
  bottomPadding?: boolean;
} & Omit<YStackProps, 'bottom'>;

const ModalTemplate = YStack.styleable<ModalTemplateProps>(
  ({ children, title, height = 50, bottomPadding, ...props }, ref) => {
    const { bottom } = useSafeAreaInsets();

    return (
      <YStack
        height={(DEVICE.height * height) / 100 + bottom}
        paddingBottom={bottom}
        onPress={() => Keyboard.dismiss()}
        backgroundColor={'$modalBackground'}
        paddingHorizontal={'6%'}
        ref={ref}
        borderTopLeftRadius={'$6'}
        borderTopRightRadius={'$6'}>
        <Button
          color={'$inversed'}
          icon={<ArrowLeft size={'$5'} />}
          position="absolute"
          top={DEVICE.height * 0.05}
          left={'5%'}
          onPress={() => router.back()}
        />
        {title && (
          <Stack
            height={DEVICE.height * 0.1}
            paddingHorizontal={'13%'}
            justifyContent="center"
            alignItems="center">
            <Text fontSize={'$8'} fontFamily={'$bold'}>
              {title}
            </Text>
          </Stack>
        )}
        <YStack flex={1} paddingBottom={bottomPadding && '10%'} {...props}>
          {children}
        </YStack>
      </YStack>
    );
  }
);

ModalTemplate.displayName = 'ModalTemplate';

export default ModalTemplate;
