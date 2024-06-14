import { GetProps, styled } from '@tamagui/core';
import { Input as TInput } from 'tamagui';

const Input = styled(TInput, {
  name: 'Input',

  color: '$inversed',
  placeholderTextColor: '$inversed50',
  borderWidth: 0,
  fontSize: '$3',
});

export default Input;

export type InputProps = GetProps<typeof Input>;
