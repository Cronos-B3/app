import { Svg, Path, SvgProps } from 'react-native-svg';

export default function TabBarBackground({
  color,
  height = '100%',
  width = '100%',
  ...rest
}: SvgProps) {
  // if (__DEV__) console.log('🌈 - TabBar');

  const pathsProps = {
    fill: color,
  };

  return (
    <Svg width={width} height={height} viewBox="0 0 390 64" {...rest}>
      <Path
        d="M149.745 0L0 0V64H390V0H240.255C239.973 0.796571 239.67 1.58646 239.346 2.36881C236.934 8.19243 233.398 13.4839 228.941 17.9411C224.484 22.3983 219.192 25.934 213.369 28.3462C207.545 30.7584 201.303 32 195 32C188.697 32 182.455 30.7584 176.631 28.3462C170.808 25.934 165.516 22.3983 161.059 17.9411C156.602 13.4839 153.066 8.19243 150.654 2.3688C150.33 1.58646 150.027 0.79657 149.745 0Z"
        {...pathsProps}
      />
    </Svg>
  );
}
