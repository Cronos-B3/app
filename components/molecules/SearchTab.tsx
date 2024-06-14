import { Button, GetProps, styled } from 'tamagui';

const SearchTab = styled(Button, {
  unstyled: false,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderBottomWidth: 1,
  fontSize: '$3',
  borderBottomColor: '$inversed',
  color: '$inversed',
  fontFamily: '$bold',

  variants: {
    isFocus: {
      true: {},
      false: {
        opacity: 0.6,
        fontFamily: 'unset',
      },
    },
  } as const,
});

export default SearchTab;

export type SearchTabProps = GetProps<typeof SearchTab>;
