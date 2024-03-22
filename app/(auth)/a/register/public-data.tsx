import StyledInput from 'components/molecules/Input/StyledInput';
import LoadingButton from 'components/molecules/LoadingButton/LoadingButton';
import RULES from 'constants/rules';
import { as, gs } from 'constants/styles';
import { useTheme } from 'contexts/ThemeContext';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useTokenStore } from 'hooks/store/useTokenStore';
import { useUserStore } from 'hooks/store/useUserStore';
import { useAPI } from 'hooks/useAPI';
import useErrorHandling from 'hooks/useErrorHandling';
import { auth } from 'lib/api/backendRoutes';
import avoidKeyboard from 'lib/avoidKeyboard';
import convertUser from 'lib/convertDataDB/convertUser';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

export default () => {
  const { email, birthdate, password, password_confirmation } = useLocalSearchParams<{
    email?: string;
    birthdate?: string;
    password?: string;
    password_confirmation?: string;
  }>();

  if (!(email && birthdate && password && password_confirmation)) {
    return <Redirect href="/a/login" />;
  }

  const { t } = useTranslation();
  const keyboards = avoidKeyboard(1);
  const { call, loading } = useAPI();
  const { handleError } = useErrorHandling();
  const toast = useToast();
  const { colors } = useTheme();
  const { setToken } = useTokenStore();
  const { setUser } = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      profilePicture: '',
      username: '',
      nickname: ''
    }
  });

  const request = async (data: any) => {
    try {
      const { token, user } = await call(auth.register.post(data));

      setToken(token);
      setUser(convertUser(user));

      router.navigate('/a/home');
    } catch (error) {
      const response = handleError(error);
      if (!response) return;

      switch (response.status) {
        case 422:
          break;

        default:
          toast.show(t('error:generic'), { type: 'danger' });
          break;
      }
    }
  };

  return (
    <View style={as.container}>
      <View style={{ gap: 14 }}>
        <Controller
          control={control}
          name="username"
          rules={{ required: true, ...RULES.username }}
          render={({ field: { onChange, value, name } }) => (
            <StyledInput
              type={name}
              style={gs.inputContainer}
              error={errors[name]?.type}
              onChangeText={onChange}
              value={value}
              ref={keyboards['ref1']}
              maxLength={31}
              autoCapitalize="none"
              onSubmitEditing={() => keyboards['ref2']?.current?.focus()}
            />
          )}
        />
        <Controller
          control={control}
          name="nickname"
          render={({ field: { onChange, value, name } }) => (
            <StyledInput
              type={name}
              style={gs.inputContainer}
              error={errors[name]?.type}
              onChangeText={onChange}
              value={value}
              ref={keyboards['ref2']}
              maxLength={31}
              autoCapitalize="none"
            />
          )}
        />
      </View>
      <LoadingButton
        style={[gs.button, { backgroundColor: colors.secondary }]}
        onPress={handleSubmit((data: any) => {
          request({ ...data, email, birthdate, password, password_confirmation });
        })}
        loading={loading}
      >
        {t('auth:register')}
      </LoadingButton>
    </View>
  );
};
