import React, { useMemo, useState } from 'react';
import Text from 'components/ui/atoms/Text/Text';
import { StyleSheet, View } from 'react-native';
import AuthTemplate from 'components/templates/AuthTemplate/AuthTemplate';
import { useAPI } from 'hooks/useAPI';
import { useTranslate } from 'contexts/TranslateContext';
import { useTheme } from 'contexts/ThemeContext';
import avoidKeyboard from 'lib/avoidKeyboard';
import EmailInput from 'components/ui/molecules/EmailInput/EmailInput';
import PasswordInput from 'components/ui/molecules/PasswordInput/PasswordInput';
import { GLOBAL_STYLES as gs, AUTH_STYLES as as } from 'constants/Styles';
import LoadingButton from 'components/ui/molecules/LoadingButton/LoadingButton';
import { router } from 'expo-router';

export default () => {
  if (__DEV__) console.log('🏳️ - register');
  const keyboards = avoidKeyboard(2);
  const { colors } = useTheme();
  const { text } = useTranslate();
  const { call, loading } = useAPI();

  const [email, setEmail] = useState<string>(() => '');
  const [wrongEmail, setWrongEmail] = useState<boolean>(() => false);
  const [emailValid, setEmailValid] = useState<boolean>(() => true);
  const [password, setPassword] = useState<string>(() => '');
  const [passwordValid, setPasswordValid] = useState<boolean>(() => true);
  const [canConnect, setCanConnect] = useState<boolean>(() => false);

  const emailInputMemoized = useMemo(() => {
    if (__DEV__) console.log('📃 - emailInputMemoized');

    return (
      <EmailInput
        ref={keyboards['ref1']}
        {...{ email, setEmail, wrongEmail, setWrongEmail, emailValid, setEmailValid }}
        style={as.inputContainer}
        inputStyle={[
          as.inputStyle,
          { borderBottomColor: emailValid ? `${colors.text}60` : colors.error }
        ]}
        onSubmitEditing={() => {
          if (!keyboards['ref2']) return;
          keyboards['ref2'].current.focus();
        }}
      />
    );
  }, [email, emailValid, wrongEmail]);

  const passwordInputMemoized = useMemo(() => {
    if (__DEV__) console.log('📃 - passwordInputMemoized');

    return (
      <PasswordInput
        ref={keyboards['ref2']}
        {...{ password, setPassword, passwordValid, setPasswordValid }}
        style={as.inputContainer}
        inputStyle={[
          as.inputStyle,
          { borderBottomColor: passwordValid ? `${colors.text}60` : colors.error }
        ]}
        onSubmitEditing={() => requestRegister()}
      />
    );
  }, [email, password, passwordValid]);

  const requestRegister = async () => {
    if (__DEV__) console.log('🔐 - requestRegister');

    if (!canConnect) return;

    router.push('/home');

    // const data = await call(auth.no_account.post({ u_password: password, ue_email: email }));

    // TODO: register
  };

  return (
    <AuthTemplate>
      <View style={{ height: '90%', justifyContent: 'space-evenly' }}>
        {emailInputMemoized}
        {emailInputMemoized}
        {passwordInputMemoized}
        {passwordInputMemoized}
        <LoadingButton
          style={[as.button, { backgroundColor: colors.secondary }]}
          disabled={!canConnect}
          loading={loading}
          onPress={() => requestRegister()}
        >
          <Text style={gs.buttonText}>{text.auth.register}</Text>
        </LoadingButton>
      </View>
    </AuthTemplate>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  }
});
