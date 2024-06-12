import { Button, styled } from 'tamagui';

const ButtonTabBar = styled(Button, {
  height: '90%',
  aspectRatio: 1,
  position: 'absolute',
  backgroundColor: '$primary',
  borderColor: '$notInversed50',
  borderRadius: '$round',

  variants: {
    big: { true: { height: '110%' } },
    placement: {
      middle: {
        top: '-75%',
        alignSelf: 'center',
      },
      left: {
        top: '-150%',
        left: '30%',
      },
      right: {
        top: '-150%',
        right: '30%',
      },
    },
  } as const,
});

ButtonTabBar.displayName = 'ButtonTabBar';

export default ButtonTabBar;
