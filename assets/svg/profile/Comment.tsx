import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { SvgProps } from '../Index';

export const Comment = ({ color, height = '100%', width = '100%', ...rest }: SvgProps) => {
    if (__DEV__) console.log('Comment 💬');

    return (
        <Svg width={width} height={height} viewBox="0 0 20 18" fill="none" {...rest}>
            <Path d="M3.20505 13.038C3.32928 13.1627 3.42447 13.3133 3.48384 13.479C3.54321 13.6447 3.5653 13.8215 3.54854 13.9967C3.46442 14.8076 3.30496 15.6089 3.07221 16.3903C4.74176 16.0037 5.76144 15.5561 6.2246 15.3215C6.4873 15.1885 6.78984 15.157 7.07434 15.233C7.88988 15.4504 8.73044 15.5598 9.57447 15.5585C14.3569 15.5585 17.9521 12.1991 17.9521 8.37766C17.9521 4.55745 14.3569 1.19681 9.57447 1.19681C4.79202 1.19681 1.19681 4.55745 1.19681 8.37766C1.19681 10.1346 1.93524 11.7646 3.20505 13.038ZM2.61503 17.7116C2.33147 17.7678 2.04698 17.8193 1.7617 17.866C1.52234 17.9043 1.34043 17.6553 1.43497 17.4327C1.54124 17.1821 1.63864 16.9278 1.72699 16.6703L1.73059 16.6584C2.02739 15.7967 2.26915 14.8057 2.35771 13.883C0.889229 12.4109 0 10.484 0 8.37766C0 3.7508 4.28697 0 9.57447 0C14.862 0 19.1489 3.7508 19.1489 8.37766C19.1489 13.0045 14.862 16.7553 9.57447 16.7553C8.62618 16.7566 7.68182 16.6335 6.76556 16.3891C6.14322 16.7039 4.80399 17.2771 2.61503 17.7116Z" fill={color} />
        </Svg >
    );
};