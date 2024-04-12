import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { ISvgFocus, SvgProps } from './types';

const Upvote = ({
  color,
  focused,
  height = '100%',
  width = '100%',
  ...rest
}: SvgProps & ISvgFocus) => {
//   if (__DEV__) console.log('🌈 - Upvote');

  const pathsProps = {
    fill: focused ? color : 'none',
    stroke: color,
    strokeWidth: '2'
  };

  return (
    <Svg width={width} height={height} viewBox="0 0 16 20" {...rest}>
      <Path d="M5 19V8H1L8 1L15 8H11V19H5Z" {...pathsProps} />
    </Svg>
  );
};

export default Upvote;
