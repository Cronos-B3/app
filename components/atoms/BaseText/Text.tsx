import React from 'react';
import { Text as TextRN } from 'react-native';
import BaseText, { BaseTextProps } from './BaseText';

const Text = ({ children, ...rest }: BaseTextProps) => {
  // if (__DEV__) console.log('🐙 - Text');

  return (
    <BaseText TextComponent={TextRN} {...rest}>
      {children}
    </BaseText>
  );
};

export default Text;
