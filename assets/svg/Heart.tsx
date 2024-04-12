import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { ISvgFocus, SvgProps } from './types';

const Heart = ({
  color,
  focused,
  height = '100%',
  width = '100%',
  ...rest
}: SvgProps & ISvgFocus) => {
  // if (__DEV__) console.log('🌈 - Heart');

  const pathsProps = {
    fill: focused ? color : 'none',
    stroke: color,
    strokeWidth: '2'
  };

  return (
    <Svg width={width} height={height} viewBox="0 0 22 20" {...rest}>
      <Path
        d="M19.4201 2.57996C18.9184 2.07653 18.3223 1.67709 17.6659 1.40455C17.0095 1.132 16.3058 0.991699 15.5951 0.991699C14.8844 0.991699 14.1806 1.132 13.5243 1.40455C12.8679 1.67709 12.2718 2.07653 11.7701 2.57996L11.0001 3.35996L10.2301 2.57996C9.72841 2.07653 9.13229 1.67709 8.47591 1.40455C7.81953 1.132 7.1158 0.991699 6.40509 0.991699C5.69437 0.991699 4.99065 1.132 4.33427 1.40455C3.67789 1.67709 3.08176 2.07653 2.58009 2.57996C0.460086 4.69996 0.330086 8.27996 3.00009 11L11.0001 19L19.0001 11C21.6701 8.27996 21.5401 4.69996 19.4201 2.57996Z"
        {...pathsProps}
      />
    </Svg>
  );
};

export default Heart;
