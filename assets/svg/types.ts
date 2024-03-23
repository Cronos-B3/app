import { SvgProps as SvgPropsDefault } from 'react-native-svg';

interface ISvg {
  color: string;
}

type SvgProps = ISvg & SvgPropsDefault;

interface ISvgFocus {
  focused?: boolean;
}

export { SvgProps, ISvgFocus };
