import { GetProps, styled } from '@tamagui/core';
import { Input as TInput } from 'tamagui';

const Input = styled(TInput, {
  name: 'Input',

  placeholderTextColor: '$inversed50',
  fontSize: '$3',
});

export default Input;

export type InputProps = GetProps<typeof Input>;
