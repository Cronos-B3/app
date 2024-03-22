import { Animated } from 'react-native';
import { StyleSheet } from 'react-native';

type AuthTemplateProps = {
  children: React.ReactNode;
  keyboardOffset?: Animated.Value;
};

const AuthTemplate = ({ children, keyboardOffset }: AuthTemplateProps) => {
  if (__DEV__) console.log('🐙 - AuthView');

  return (
    <>
      <Animated.View
        style={[s.containerView, keyboardOffset && { transform: [{ translateY: keyboardOffset }] }]}
      >
        {children}
      </Animated.View>
    </>
  );
};

export default AuthTemplate;

const s = StyleSheet.create({
  containerView: {
    flex: 1,
    marginHorizontal: '5%',
    justifyContent: 'center'
  },
  title: { alignItems: 'center' },
  text: { fontSize: 18 }
});
