import { Dimensions } from 'react-native';
import Constants from 'expo-constants';

const APP_CONFIG = {
  SCHEME: Constants.expoConfig?.scheme + '://'
};

const window = Dimensions.get('window');

const DEVICE = {
  width: window.width,
  height: window.height
};

export { APP_CONFIG, DEVICE };
