import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { SvgProps } from '../types';

export const Heart = ({ color, height = '100%', width = '100%', ...rest }: SvgProps) => {
    if (__DEV__) console.log('Heart ❤');

    return (
        <Svg width={width} height={height} viewBox="0 0 20 18" fill="none" {...rest}>
            <Path d="M9.59984 3.29765L8.73945 2.41325C6.71985 0.337257 3.01666 1.05365 1.67987 3.66365C1.05227 4.89124 0.910671 6.66364 2.05667 8.92563C3.16066 11.1036 5.45746 13.7124 9.59984 16.554C13.7422 13.7124 16.0378 11.1036 17.143 8.92563C18.289 6.66244 18.1486 4.89124 17.5198 3.66365C16.183 1.05365 12.4798 0.336057 10.4602 2.41205L9.59984 3.29765ZM9.59984 18C-8.7997 5.84164 3.93466 -3.64793 9.38864 1.37165C9.46064 1.43765 9.53144 1.50605 9.59984 1.57685C9.66755 1.50612 9.738 1.43807 9.81104 1.37285C15.2638 -3.65033 27.9994 5.84044 9.59984 18Z" fill={color} />
        </Svg >
    );
};