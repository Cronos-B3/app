import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import avoidKeyboard from 'lib/avoidKeyboard';
import { GLOBAL_STYLES as gs, AUTH_STYLES as as } from 'constants/Styles';
import { useTheme } from 'contexts/ThemeContext';
import PasswordInput from 'components/molecules/PasswordInput/PasswordInput';
import { useAPI } from 'hooks/useAPI';
import AuthTemplate from 'components/templates/AuthTemplate/AuthTemplate';
import Pressable from 'components/atoms/Pressable/Pressable';
import Text from 'components/atoms/Text/Text';
import { useTranslate } from 'contexts/TranslateContext';
import { router } from 'expo-router';
import LoadingButton from 'components/molecules/LoadingButton/LoadingButton';
import LoginInput from 'components/molecules/LoginInput/LoginInput';

export default () => {
  if (__DEV__) console.log('🏳️ - login');
  const keyboards = avoidKeyboard(2);
  const { colors } = useTheme();
  const { text } = useTranslate();
  const { call, loading } = useAPI();

  const [log, setLog] = useState<string>(() => '');
  const [wrongLog, setWrongLog] = useState<boolean>(() => false);
  const [logValid, setLogValid] = useState<boolean>(() => true);
  const [password, setPassword] = useState<string>(() => '');
  const [passwordValid, setPasswordValid] = useState<boolean>(() => true);
  const [canConnect, setCanConnect] = useState<boolean>(() => false);

  const emailInputMemoized = useMemo(() => {
    if (__DEV__) console.log('📃 - emailInputMemoized');

    return (
      <LoginInput
        ref={keyboards['ref1']}
        {...{ log, setLog, wrongLog, setWrongLog, logValid, setLogValid }}
        style={as.inputContainer}
        inputStyle={[
          as.inputStyle,
          { borderBottomColor: logValid ? `${colors.text}60` : colors.error }
        ]}
        onSubmitEditing={() => {
          if (!keyboards['ref2']) return;
          keyboards['ref2'].current.focus();
        }}
      />
    );
  }, [log, logValid, wrongLog]);

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
  }, [log, password, passwordValid]);

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
        <Text style={s.smallText}>{text.auth.no_account}</Text>
        <Text style={s.smallText} font="bold">
          {text.auth.no_account_link}
        </Text>
      </Pressable>
    );
  }, []);

  useEffect(() => {
    setCanConnect(logValid && log !== '' && passwordValid && password !== '');
  }, [logValid, passwordValid, log, password]);

  const requestLogin = async () => {
    if (__DEV__) console.log('🔐 - requestLogin');

    if (!canConnect) return;

    router.push('/home');

    // const data = await call(auth.login.post({ u_password: password, ue_email: log }));

    // TODO: login
  };

  // return <View style={s.container}>{emailInputMemoized}</View>;
  return (
    <AuthTemplate keyboardOffset={keyboards['offset']}>
      <View style={{ height: '70%', justifyContent: 'space-evenly' }}>
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
