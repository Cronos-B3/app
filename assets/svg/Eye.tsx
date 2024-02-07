import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { SvgProps } from './Index';

const EyeClose = ({ color, height = '100%', width = '100%', ...rest }: SvgProps) => {
  if (__DEV__) console.log('🌈 - EyeClose');

  return (
    <Svg width={width} height={height} viewBox="0 0 23 19" fill="none" {...rest}>
      <Path
        d="M15.5106 16.561L13.1905 14.2394C12.2933 14.5602 11.3234 14.6196 10.3937 14.4107C9.46406 14.2019 8.61282 13.7333 7.93905 13.0595C7.26529 12.3857 6.7967 11.5345 6.58782 10.6048C6.37893 9.67516 6.43834 8.70529 6.75913 7.80806L3.79787 4.84681C1.34837 7.02462 0 9.5 0 9.5C0 9.5 4.3125 17.4062 11.5 17.4062C12.8806 17.4015 14.2455 17.1138 15.5106 16.561ZM7.48938 2.439C8.75445 1.88617 10.1194 1.5985 11.5 1.59375C18.6875 1.59375 23 9.5 23 9.5C23 9.5 21.6502 11.9739 19.2036 14.1546L16.2394 11.1905C16.5602 10.2933 16.6196 9.3234 16.4107 8.39373C16.2019 7.46406 15.7333 6.61282 15.0595 5.93905C14.3857 5.26529 13.5345 4.7967 12.6048 4.58782C11.6752 4.37893 10.7053 4.43834 9.80806 4.75913L7.48938 2.439Z"
        fill={color}
      />
      <Path
        d="M7.94227 8.99219C7.8632 9.54463 7.91388 10.1079 8.09028 10.6374C8.26669 11.1668 8.56398 11.6479 8.9586 12.0425C9.35322 12.4372 9.83432 12.7345 10.3638 12.9109C10.8932 13.0873 11.4565 13.1379 12.009 13.0589L7.94227 8.99219ZM15.0579 10.0099L10.9912 5.94181C11.5437 5.86274 12.1069 5.91341 12.6364 6.08982C13.1658 6.26623 13.647 6.56352 14.0416 6.95814C14.4362 7.35276 14.7335 7.83386 14.9099 8.36332C15.0863 8.89278 15.137 9.45605 15.0579 10.0085V10.0099ZM19.6162 18.6349L2.36621 1.38494L3.38396 0.367188L20.634 17.6172L19.6162 18.6349Z"
        fill={color}
      />
    </Svg>
  );
};

const EyeOpen = ({ color, height = '100%', width = '100%', ...rest }: SvgProps) => {
  if (__DEV__) console.log('🌈 - EyeOpen');

  return (
    <Svg width={width} height={height} viewBox="0 0 23 19" fill="none" {...rest}>
      <Path
        d="M15.0938 9.5C15.0938 10.4531 14.7151 11.3672 14.0412 12.0412C13.3672 12.7151 12.4531 13.0938 11.5 13.0938C10.5469 13.0938 9.63279 12.7151 8.95884 12.0412C8.28488 11.3672 7.90625 10.4531 7.90625 9.5C7.90625 8.54688 8.28488 7.63279 8.95884 6.95884C9.63279 6.28488 10.5469 5.90625 11.5 5.90625C12.4531 5.90625 13.3672 6.28488 14.0412 6.95884C14.7151 7.63279 15.0938 8.54688 15.0938 9.5Z"
        fill={color}
      />
      <Path
        d="M0 9.5C0 9.5 4.3125 1.59375 11.5 1.59375C18.6875 1.59375 23 9.5 23 9.5C23 9.5 18.6875 17.4062 11.5 17.4062C4.3125 17.4062 0 9.5 0 9.5ZM11.5 14.5312C12.8344 14.5312 14.1141 14.0012 15.0576 13.0576C16.0012 12.1141 16.5312 10.8344 16.5312 9.5C16.5312 8.16563 16.0012 6.88591 15.0576 5.94237C14.1141 4.99883 12.8344 4.46875 11.5 4.46875C10.1656 4.46875 8.88591 4.99883 7.94237 5.94237C6.99883 6.88591 6.46875 8.16563 6.46875 9.5C6.46875 10.8344 6.99883 12.1141 7.94237 13.0576C8.88591 14.0012 10.1656 14.5312 11.5 14.5312Z"
        fill={color}
      />
    </Svg>
  );
};

export { EyeOpen, EyeClose };