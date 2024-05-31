import { GetProps, View as TView, styled } from '@tamagui/core';

const View = styled(TView, {
  name: 'View',

  variants: {
    centered: {
      true: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  } as const,
});

export default View;

export type ExampleProps = GetProps<typeof View>;
