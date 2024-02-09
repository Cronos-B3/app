import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import EmailInput from 'components/ui/molecules/EmailInput/EmailInput';
import avoidKeyboard from 'lib/avoidKeyboard';
import { GLOBAL_STYLES as gs, AUTH_STYLES as as } from 'constants/Styles';
import { useTheme } from 'contexts/ThemeContext';
import PasswordInput from 'components/ui/molecules/PasswordInput/PasswordInput';
import { useAPI } from 'hooks/useAPI';
import AuthTemplate from 'components/templates/AuthTemplate/AuthTemplate';
import Pressable from 'components/ui/atoms/Pressable/Pressable';
import Text from 'components/ui/atoms/Text/Text';
import { useTranslate } from 'contexts/TranslateContext';
import { router } from 'expo-router';
import LoadingButton from 'components/ui/molecules/LoadingButton/LoadingButton';

export default () => {
  if (__DEV__) console.log('🏳️ - login');
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
        onSubmitEditing={() => requestLogin()}
      />
    );
  }, [email, password, passwordValid]);

  const forgotPasswordMemoized = useMemo(() => {
    if (__DEV__) console.log('📃 - forgotPasswordMemoized');

    return (
      <Pressable style={s.forgetPasswordContainer}>
        <Text style={[s.smallText, s.underline]}>{text.auth.forgot_password}</Text>
      </Pressable>
    );
  }, []);

  const createAccountMemoized = useMemo(() => {
    if (__DEV__) console.log('📃 - createAccountMemoized');

    return (
      <Pressable style={s.createAccountContainer} onPress={() => router.push('/register')}>
        <Text style={s.smallText}>{text.auth.register}</Text>
        <Text style={s.smallText} font="bold">
          {text.auth.register_link}
        </Text>
      </Pressable>
    );
  }, []);

  useEffect(() => {
    setCanConnect(emailValid && email !== '' && passwordValid && password !== '');
  }, [emailValid, passwordValid, email, password]);

  const requestLogin = async () => {
    if (__DEV__) console.log('🔐 - requestLogin');

    if (!canConnect) return;

    // const data = await call(auth.login.post({ u_password: password, ue_email: email }));

    // TODO: login
  };

  // return <View style={s.container}>{emailInputMemoized}</View>;
  return (
    <AuthTemplate keyboardOffset={keyboards['offset']}>
      <View style={{ height: '60%', justifyContent: 'space-between' }}>
        {emailInputMemoized}
        <View>
          {passwordInputMemoized}
          {forgotPasswordMemoized}
        </View>
        <View>
          <LoadingButton
            style={[as.button, { backgroundColor: colors.secondary }]}
            disabled={!canConnect}
            loading={loading}
            onPress={() => requestLogin()}
          >
            <Text style={gs.buttonText}>{text.auth.login}</Text>
          </LoadingButton>
          {createAccountMemoized}
        </View>
      </View>
    </AuthTemplate>
  );
};

const s = StyleSheet.create({
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    paddingVertical: 8
  },
  forgetPasswordContainer: {
    opacity: 0.6,
    marginLeft: '2%',
    marginTop: 8
  },
  smallText: { fontSize: 12 },
  underline: { textDecorationLine: 'underline' }
});
