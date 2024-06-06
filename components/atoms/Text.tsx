import { GetProps, styled } from '@tamagui/core';
import { Text as TText } from 'tamagui';

const Text = styled(TText, {
  name: 'Text',

  ellipsizeMode: 'tail',
  adjustsFontSizeToFit: true,
  numberOfLines: 1,

  color: '$inversed',
  fontSize: '$3',
});

export default Text;

export type InputProps = GetProps<typeof Text>;
