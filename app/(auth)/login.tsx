import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
import RequiredInput from 'components/ui/molecules/RequiredInput/RequiredInput';
import { auth } from 'lib/api/backendRoutes';
import { useUser } from 'contexts/UserContext';

export default () => {
  if (__DEV__) console.log('🏳️ - login');
  const keyboards = avoidKeyboard(2);
  const { colors } = useTheme();
  const { text } = useTranslate();
  const { setUser } = useUser();
  const { call, loading } = useAPI();

  const [log, setLog] = useState<any>(() => {
    return { text: '', exist: true };
  });

  const [password, setPassword] = useState<any>(() => {
    return { text: '', exist: true };
  });

  const [canConnect, setCanConnect] = useState<boolean>(() => false);

  const emailInputMemoized = useMemo(() => {
    if (__DEV__) console.log('📃 - emailInputMemoized');

    return (
      <RequiredInput
        label={text.label.log}
        placeholder={text.placeholder.log}
        state={log}
        setState={setLog}
        style={as.inputContainer}
        inputStyle={[as.inputStyle, { borderColor: `${colors.text}60` }]}
      />
    );
  }, [log]);

  const passwordInputMemoized = useMemo(() => {
    if (__DEV__) console.log('📃 - passwordInputMemoized');

    return (
      <PasswordInput
        state={password}
        setState={setPassword}
        style={as.inputContainer}
        inputStyle={[as.inputStyle, { borderColor: `${colors.text}60` }]}
      />
    );
  }, [password]);

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
    setCanConnect(log.text !== '' && log.exist && password.text !== '' && password.exist);
  }, [log, password]);

  const requestLogin = async () => {
    if (__DEV__) console.log('🔐 - requestLogin');

    if (!canConnect) return;

    try {
      const data = await call(auth.login.post({ u_email: log.text, u_password: password.text }));
      // setUser({ ...data.user, token: data.token });
      router.replace('/home');
    } catch (e) {
      console.log(e);
    }
  };

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
