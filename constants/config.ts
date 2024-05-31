import { Dimensions } from 'react-native';

const window = Dimensions.get('window');

const DEVICE = {
  width: window.width,
  height: window.height,
};

export { DEVICE };
