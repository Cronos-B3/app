import { StyleSheet } from 'react-native';
import { DEVICE } from './config';

const GLOBAL_STYLES = StyleSheet.create({
  flex: { flex: 1 },
  inputContainer: {
    height: DEVICE.height * 0.067,
    width: '100%'
  },
  inputText: {
    borderBottomWidth: 1,
    marginHorizontal: '1%'
  },
  button: {
    height: DEVICE.height * 0.047,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9
  },
  buttonText: { fontSize: 16 }
});

export { GLOBAL_STYLES as gs };
