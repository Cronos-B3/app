import { Button, GetProps, Spinner, styled } from 'tamagui';
import { DEVICE } from '@/constants/config';

const StyledLoadingButton = styled(Button, {
  backgroundColor: '$secondary',

  fontSize: '$4',
  color: '$inversed',

  variants: {
    customSize: {
      small: {
        height: DEVICE.height * 0.045,
        fontSize: '$3',
      },
      medium: {
        height: DEVICE.height * 0.0525,
        fontSize: '$4',
      },
      large: {
        height: DEVICE.height * 0.06,
        borderRadius: '$3',
        fontSize: '$5',
      },
    },

    red: {
      true: {
        backgroundColor: '$inversedRed',
      },
    },

    isLoading: {
      true: {
        disabled: true,
      },
    },
  } as const,

  defaultVariants: {
    customSize: 'medium',
    isLoading: false,
  },
});

export type LoadingButtonProps = GetProps<typeof StyledLoadingButton>;

const LoadingButton = StyledLoadingButton.styleable<LoadingButtonProps>(
  ({ children, isLoading, ...props }, ref) => {
    if (isLoading) {
      return (
        <StyledLoadingButton {...props} isLoading ref={ref} icon={<Spinner size={'small'} />} />
      );
    }

    return (
      <StyledLoadingButton {...props} ref={ref}>
        {children}
      </StyledLoadingButton>
    );
  }
);

LoadingButton.displayName = 'LoadingButton';

export default LoadingButton;
