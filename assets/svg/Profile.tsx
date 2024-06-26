import { Svg, Path } from 'react-native-svg';
import { SvgProps } from './types';

const Profile = ({ color, height = '100%', width = '100%', ...rest }: SvgProps) => {
  if (__DEV__) console.log('🌈 - Profile');

  const pathsProps = {
    fill: color
  };

  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" {...rest}>
      <Path
        d="M2.41667 29C2.41667 29 0 29 0 26.5833C0 24.1667 2.41667 16.9167 14.5 16.9167C26.5833 16.9167 29 24.1667 29 26.5833C29 29 26.5833 29 26.5833 29H2.41667ZM14.5 14.5C16.4228 14.5 18.2669 13.7362 19.6265 12.3765C20.9862 11.0169 21.75 9.17282 21.75 7.25C21.75 5.32718 20.9862 3.48311 19.6265 2.12348C18.2669 0.763837 16.4228 0 14.5 0C12.5772 0 10.7331 0.763837 9.37348 2.12348C8.01384 3.48311 7.25 5.32718 7.25 7.25C7.25 9.17282 8.01384 11.0169 9.37348 12.3765C10.7331 13.7362 12.5772 14.5 14.5 14.5Z"
        {...pathsProps}
      />
    </Svg>
  );
};

export default Profile;
