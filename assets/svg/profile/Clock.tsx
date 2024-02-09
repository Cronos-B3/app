import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { SvgProps } from '../Index';

export const Clock = ({ color, height = '100%', width = '100%', ...rest }: SvgProps) => {
    if (__DEV__) console.log('Clock 🔔');

    return (
        <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...rest}>
            <Path d="M10.2201 4.375C10.2201 4.20924 10.1568 4.05027 10.0442 3.93306C9.93156 3.81585 9.77879 3.75 9.6195 3.75C9.4602 3.75 9.30744 3.81585 9.1948 3.93306C9.08217 4.05027 9.01889 4.20924 9.01889 4.375V11.25C9.01892 11.3602 9.04694 11.4684 9.1001 11.5636C9.15325 11.6589 9.22967 11.7379 9.32159 11.7925L13.5259 14.2925C13.6638 14.3701 13.8255 14.3885 13.9763 14.3437C14.1271 14.2989 14.2551 14.1944 14.3329 14.0527C14.4107 13.9111 14.4322 13.7433 14.3927 13.5854C14.3532 13.4274 14.256 13.2918 14.1217 13.2075L10.2201 10.8875V4.375Z" fill={color} />
            <Path d="M10.2201 20C12.7688 20 15.2131 18.9464 17.0152 17.0711C18.8174 15.1957 19.8299 12.6522 19.8299 10C19.8299 7.34784 18.8174 4.8043 17.0152 2.92893C15.2131 1.05357 12.7688 0 10.2201 0C7.67144 0 5.22716 1.05357 3.42498 2.92893C1.62281 4.8043 0.610352 7.34784 0.610352 10C0.610352 12.6522 1.62281 15.1957 3.42498 17.0711C5.22716 18.9464 7.67144 20 10.2201 20ZM18.6286 10C18.6286 12.3206 17.7427 14.5462 16.1658 16.1872C14.5889 17.8281 12.4502 18.75 10.2201 18.75C7.99002 18.75 5.85128 17.8281 4.27437 16.1872C2.69747 14.5462 1.81157 12.3206 1.81157 10C1.81157 7.67936 2.69747 5.45376 4.27437 3.81282C5.85128 2.17187 7.99002 1.25 10.2201 1.25C12.4502 1.25 14.5889 2.17187 16.1658 3.81282C17.7427 5.45376 18.6286 7.67936 18.6286 10Z" fill={color} />
        </Svg >
    );
};