import Text from 'components/ui/atoms/Text/Text';
import ViewDismissKeyboard from 'components/ui/molecules/ViewDismissKeyboard/ViewDismissKeyboard';
import React, { useMemo } from 'react';
import { Animated, View } from 'react-native';
import { StyleSheet, SafeAreaView } from 'react-native';

type AuthTemplateProps = {
  title?: string | null;
  children: React.ReactNode;
  keyboardOffset?: Animated.Value;
};

const AuthTemplate = ({ title, children, keyboardOffset }: AuthTemplateProps) => {
  if (__DEV__) console.log('🐙 - AuthView');

  const titleMemoized = useMemo(() => {
    if (__DEV__) console.log('📃 - titleMemoized');

    return (
      title && (
        <View style={s.title}>
          <Text style={s.text}>{title}</Text>
        </View>
      )
    );
  }, [title]);

  return (
    <ViewDismissKeyboard>
      {title && titleMemoized}
      <Animated.View
        style={[s.containerView, keyboardOffset && { transform: [{ translateY: keyboardOffset }] }]}
      >
        {children}
      </Animated.View>
    </ViewDismissKeyboard>
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
