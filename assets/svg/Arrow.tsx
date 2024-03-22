import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { SvgProps } from './types';

export const LeftArrow = ({ color, height = '100%', width = '100%', ...rest }: SvgProps) => {
  if (__DEV__) console.log('🌈 - LeftArrow');

  return (
    <Svg width={width} height={height} viewBox="0 0 23 20" fill="none" {...rest}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.8556 10C22.8556 10.3788 22.7051 10.7421 22.4372 11.01C22.1694 11.2778 21.8061 11.4283 21.4273 11.4283H4.87882L11.012 17.5586C11.1448 17.6914 11.2501 17.8491 11.322 18.0226C11.3939 18.1961 11.4309 18.3821 11.4309 18.5699C11.4309 18.7577 11.3939 18.9437 11.322 19.1172C11.2501 19.2907 11.1448 19.4483 11.012 19.5811C10.8792 19.7139 10.7215 19.8193 10.548 19.8911C10.3745 19.963 10.1886 20 10.0007 20C9.81294 20 9.62698 19.963 9.45347 19.8911C9.27996 19.8193 9.1223 19.7139 8.9895 19.5811L0.419621 11.0112C0.286607 10.8786 0.181075 10.721 0.109069 10.5474C0.0370637 10.3739 0 10.1879 0 10C0 9.81213 0.0370637 9.6261 0.109069 9.45257C0.181075 9.27905 0.286607 9.12143 0.419621 8.98875L8.9895 0.418872C9.2577 0.150673 9.62146 0 10.0007 0C10.38 0 10.7438 0.150673 11.012 0.418872C11.2802 0.687071 11.4309 1.05083 11.4309 1.43012C11.4309 1.80941 11.2802 2.17317 11.012 2.44137L4.87882 8.57169H21.4273C21.8061 8.57169 22.1694 8.72217 22.4372 8.99003C22.7051 9.25789 22.8556 9.62119 22.8556 10Z"
        fill={color}
      />
    </Svg>
  );
};
