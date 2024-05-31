import { GetProps, View, styled } from '@tamagui/core';

const Example = styled(View, {
  name: 'Example',
  borderRadius: '$round',
  backgroundColor: '$primary',
  height: 100,
  width: 100,

  // See all variants at : https://tamagui.dev/docs/core/variants
  variants: {
    pin: {
      top: {
        position: 'absolute',
        top: 0,
      },
    },

    centered: {
      true: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  } as const,
});

export default Example;

// helper to get props for any TamaguiComponent
export type ExampleProps = GetProps<typeof Example>;
