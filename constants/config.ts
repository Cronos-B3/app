import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import moment from 'moment';

const APP_CONFIG = {
  version: Constants.expoConfig?.version
};

const window = Dimensions.get('window');

const DEVICE = {
  width: window.width,
  height: window.height
};

const LIMIT_AGE = {
  min: new Date(moment().subtract(100, 'years').format('YYYY-MM-DD')),
  max: new Date(moment().subtract(15, 'years').format('YYYY-MM-DD'))
};

export { APP_CONFIG, DEVICE, LIMIT_AGE };
