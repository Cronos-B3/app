import { EyeOpen } from 'assets/svg/Eye';
import Text from 'components/atoms/BaseText/Text';
import Pressable from 'components/atoms/Pressable/Pressable';
import StyledInput from 'components/molecules/Input/StyledInput';
import LoadingButton from 'components/molecules/LoadingButton/LoadingButton';
import RULES from 'constants/rules';
import { gs } from 'constants/styles';
import { useTheme } from 'contexts/ThemeContext';
import { router } from 'expo-router';
import { useTokenStore } from 'hooks/store/useTokenStore';
import { useUserStore } from 'hooks/store/useUserStore';
import { useAPI } from 'hooks/useAPI';
import useErrorHandling from 'hooks/useErrorHandling';
import { auth } from 'lib/api/backendRoutes';
import avoidKeyboard from 'lib/avoidKeyboard';
import convertUser from 'lib/convertDataDB/convertUser';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { Heart } from './../../../assets/svg/test/Heart';
import StyledPasswordInput from 'components/PasswordInput/StyledPasswordInput';

export default () => {
  if (__DEV__) console.log('🏳️ - login');

  const { setToken } = useTokenStore();
  const { setUser } = useUserStore();

  const { t } = useTranslation('auth');
  const { colors } = useTheme();
  const keyboards = avoidKeyboard(2);
  const { call, loading } = useAPI();
  const { handleError } = useErrorHandling();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      identifier: '',
      password: ''
    }
  });

  const forgotPasswordMemo = useMemo(() => {
    return (
      <Pressable>
        <Text style={[s.text, s.alignEnd]}>{t('forgot_password')}</Text>
      </Pressable>
    );
  }, [router, t]);

  const noAccountMemo = useMemo(() => {
    return (
      <Pressable onPress={() => router.push('/a/register')}>
        <Text style={[s.text, s.alignSelf]} numberOfLines={1}>
          <Trans
            i18nKey="auth:no_account"
            components={{
              bold: <Text noDefaultStyle font="bold" />
            }}
          />
        </Text>
      </Pressable>
    );
  }, [router, t]);

  const request = async (data: any) => {
    if (__DEV__) console.log('🐆 - request ', data);

    try {
      const { token, user } = await call(auth.login.post(data));

      setToken(token);
      setUser(convertUser(user));

      router.push('/a/home');
    } catch (error) {
      const response = handleError(error);
      if (!response) return;

      switch (response.status) {
        case 401:
          toast.show(t('error:invalid_credentials'), { type: 'danger' });
          break;

        default:
          toast.show(t('error:generic'), { type: 'danger' });
          break;
      }
    }
  };

  return (
    <View style={s.container}>
      <Controller
        control={control}
        name="identifier"
        rules={{ required: true, ...RULES.identifier }}
        render={({ field: { onChange, value, name } }) => (
          <StyledInput
            type={name}
            style={gs.inputContainer}
            error={errors[name]?.type}
            onChangeText={onChange}
            value={value}
            ref={keyboards['ref1']}
            maxLength={127}
            autoCapitalize="none"
            onSubmitEditing={() => keyboards['ref2']?.current?.focus()}
          />
        )}
      />
      <View style={s.partView}>
        <Controller
          control={control}
          name="password"
          rules={{ required: true, ...RULES.password }}
          render={({ field: { onChange, value, name } }) => (
            <StyledPasswordInput
              type={name}
              style={gs.inputContainer}
              error={errors[name]?.type}
              onChangeText={onChange}
              value={value}
              ref={keyboards['ref2']}
              maxLength={63}
              autoCapitalize="none"
              onSubmitEditing={handleSubmit(request)}
            />
          )}
        />
        {forgotPasswordMemo}
      </View>
      <View style={s.partView}>
        <LoadingButton
          style={[gs.button, { backgroundColor: colors.secondary }]}
          onPress={handleSubmit(request)}
          loading={loading}
        >
          {t('login')}
        </LoadingButton>
        {noAccountMemo}
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: '5%'
  },
  partView: { gap: 4 },
  text: {
    fontSize: 13,
    opacity: 0.9
  },
  alignSelf: { alignSelf: 'center' },
  alignEnd: { alignSelf: 'flex-end' }
});
