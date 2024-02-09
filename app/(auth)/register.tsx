import React, { useEffect, useMemo, useState } from 'react';
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
import RequiredInput from 'components/ui/molecules/RequiredInput/RequiredInput';
import { auth } from 'lib/api/backendRoutes';
import { useUser } from 'contexts/UserContext';

export default () => {
  if (__DEV__) console.log('🏳️ - register');
  const keyboards = avoidKeyboard(4);
  const { colors } = useTheme();
  const { text } = useTranslate();
  const { setUser } = useUser();
  const { call, loading } = useAPI();

  const [username, setUsername] = useState<any>(() => {
    return { text: '', exist: true, unique: true };
  });

  const [email, setEmail] = useState<any>(() => {
    return { text: '', exist: true, valid: true, unique: true };
  });

  const [password, setPassword] = useState<any>(() => {
    return { text: '', exist: true, valid: true };
  });

  const [confirmPassword, setConfirmPassword] = useState<any>(() => {
    return { text: '', exist: true, valid: true };
  });

  const [canConnect, setCanConnect] = useState<boolean>(() => false);

  const usernameMemoized = useMemo(() => {
    if (__DEV__) console.log('📃 - usernameMemoized');

    return (
      <RequiredInput
        label={text.label.username}
        placeholder={text.placeholder.username}
        state={username}
        setState={setUsername}
        style={as.inputContainer}
        inputStyle={[as.inputStyle, { borderColor: `${colors.text}60` }]}
      />
    );
  }, [username]);

  const emailInputMemoized = useMemo(() => {
    if (__DEV__) console.log('📃 - emailInputMemoized');

    return (
      <EmailInput
        state={email}
        setState={setEmail}
        style={as.inputContainer}
        inputStyle={[as.inputStyle, { borderColor: `${colors.text}60` }]}
      />
    );
  }, [email]);

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

  const confirmPasswordInputMemoized = useMemo(() => {
    if (__DEV__) console.log('📃 - confirmPasswordInputMemoized');

    return (
      <PasswordInput
        state={confirmPassword}
        setState={setConfirmPassword}
        label={text.label.password_confirm}
        placeholder={text.placeholder.password_confirm}
        style={as.inputContainer}
        inputStyle={[as.inputStyle, { borderColor: `${colors.text}60` }]}
      />
    );
  }, [confirmPassword]);

  useEffect(() => {
    setCanConnect(
      username.exist &&
        username.text !== '' &&
        username.unique &&
        email.exist &&
        email.text !== '' &&
        email.valid &&
        email.unique &&
        password.exist &&
        password.text !== '' &&
        confirmPassword.exist &&
        confirmPassword.text !== '' &&
        password.text === confirmPassword.text
    );
  }, [username, email, password, confirmPassword]);

  const requestRegister = async () => {
    if (__DEV__) console.log('🔐 - requestRegister');

    if (!canConnect) return;

    try {
      const data = await call(
        auth.register.post({
          u_username: username.text,
          u_email: email.text,
          u_password: password.text,
          u_password_confirmation: confirmPassword.text
        })
      );
      // setUser({ ...data.user, token: data.token });
      router.replace('/home');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthTemplate>
      <View style={{ height: '90%', justifyContent: 'space-evenly' }}>
        {usernameMemoized}
        {emailInputMemoized}
        {passwordInputMemoized}
        {confirmPasswordInputMemoized}
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
