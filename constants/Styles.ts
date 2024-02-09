import { Platform, StyleSheet } from 'react-native';

const GLOBAL_STYLES = StyleSheet.create({
  flex: { flex: 1 },
  buttonText: { fontSize: 16 }
});

const AUTH_STYLES = StyleSheet.create({
  inputContainer: { height: Platform.OS === 'ios' ? 60 : 50 },
  inputStyle: {
    borderBottomWidth: 1,
    marginHorizontal: '1%'
  },
  button: {
    height: Platform.OS === 'ios' ? 48 : 38,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export { GLOBAL_STYLES, AUTH_STYLES };
