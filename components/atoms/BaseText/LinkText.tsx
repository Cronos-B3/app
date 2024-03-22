import React from 'react';
import BaseText, { BaseTextProps } from './BaseText';
import { A } from '@expo/html-elements';
import { LinkProps } from '@expo/html-elements/build/elements/Text.types';

type LinkTextProps = LinkProps & BaseTextProps;

const LinkText = ({ children, ...rest }: LinkTextProps) => {
  // if (__DEV__) console.log('🐙 - Text');

  return (
    <BaseText TextComponent={A} {...rest}>
      {children}
    </BaseText>
  );
};

export default LinkText;
