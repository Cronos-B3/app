import { Button, GetProps, styled } from 'tamagui';
import { DEVICE } from '@/constants/config';

const LoadingButton = styled(Button, {
  backgroundColor: '$secondary',
  borderRadius: '$round',

  fontSize: '$4',
  color: '$inversed',

  pressStyle: { opacity: 0.6 },

  variants: {
    customSize: {
      small: { height: DEVICE.height * 0.035 },
      medium: { height: DEVICE.height * 0.045 },
      large: { height: DEVICE.height * 0.055 },
    },
  } as const,

  defaultVariants: {
    customSize: 'large',
  },
});

export default LoadingButton;

export type LoadingButtonProps = GetProps<typeof LoadingButton>;
