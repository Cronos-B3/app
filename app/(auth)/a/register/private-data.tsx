import Pressable from 'components/atoms/Pressable/Pressable';
import StyledInput from 'components/molecules/Input/StyledInput';
import LoadingButton from 'components/molecules/LoadingButton/LoadingButton';
import StyledPasswordInput from 'components/PasswordInput/StyledPasswordInput';
import { DEVICE, LIMIT_AGE } from 'constants/config';
import RULES from 'constants/rules';
import { as, gs } from 'constants/styles';
import { useTheme } from 'contexts/ThemeContext';
import { router } from 'expo-router';
import { useConfigStore } from 'hooks/store/useConfigStore';
import { useAPI } from 'hooks/useAPI';
import useErrorHandling from 'hooks/useErrorHandling';
import { auth } from 'lib/api/backendRoutes';
import avoidKeyboard from 'lib/avoidKeyboard';
import moment from 'moment';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useToast } from 'react-native-toast-notifications';

export default () => {
  const keyboards = avoidKeyboard(3);
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { lang } = useConfigStore();
  const toast = useToast();
  const { handleError } = useErrorHandling();
  const { call, loading } = useAPI();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      email: '',
      birthdate: '',
      password: '',
      password_confirmation: ''
    }
  });

  const [showDatePicker, setShowDatePicker] = useState<boolean>(() => false);

  const password = watch('password');

  const request = async (data: any) => {
    const { email, birthdate, password, password_confirmation } = data;

    try {
      await call(auth.registerEmailExist.post({ email }));

      router.push({
        pathname: '/a/register/public-data',
        params: { email, birthdate, password, password_confirmation }
      });
    } catch (error) {
      const response = handleError(error);
      if (!response) return;

      switch (response.status) {
        case 409:
          toast.show(t('error:email_exists'), { type: 'danger' });
          break;

        default:
          toast.show(t('error:generic'), { type: 'danger' });
          break;
      }
    }
  };

  return (
    <View style={as.container}>
      <View style={s.inputsContainer}>
        <Controller
          control={control}
          name="email"
          rules={{ required: true, ...RULES.email }}
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
            />
          )}
        />
        <Controller
          control={control}
          name="birthdate"
          rules={{ required: true }}
          render={({ field: { onChange, value, name } }) => {
            const dateSplit = value.split('-');

            return (
              <>
                <Pressable onPress={() => setShowDatePicker(true)}>
                  <StyledInput
                    type={name}
                    style={gs.inputContainer}
                    error={errors[name]?.type}
                    onChangeText={onChange}
                    value={
                      value.length === 0
                        ? ''
                        : t('input:birthdate.format', {
                            year: dateSplit?.[0],
                            month: dateSplit?.[1],
                            day: dateSplit?.[2]
                          })
                    }
                    readOnly
                    pointerEvents={Platform.OS === 'ios' ? 'none' : 'auto'}
                  />
                </Pressable>
                {/* CANNOT BE USED IN EXPO GO */}
                {showDatePicker && (
                  <DatePicker
                    modal
                    open
                    locale={lang}
                    mode="date"
                    date={value ? new Date(value) : new Date(LIMIT_AGE.max)}
                    maximumDate={LIMIT_AGE.max}
                    minimumDate={LIMIT_AGE.min}
                    title={t('input:birthdate.label')}
                    cancelText={t('cancel')}
                    confirmText={t('confirm')}
                    androidVariant="nativeAndroid"
                    theme="light"
                    textColor={'#000000'}
                    onCancel={() => setShowDatePicker(false)}
                    onConfirm={(date) => {
                      onChange(moment(date).format('YYYY-MM-DD'));
                      setShowDatePicker(false);
                    }}
                  />
                )}
              </>
            );
          }}
        />
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
              onSubmitEditing={() => keyboards['ref3']?.current?.focus()}
            />
          )}
        />
        <Controller
          control={control}
          name="password_confirmation"
          rules={{ required: true, validate: (value) => value === password }}
          render={({ field: { onChange, value, name } }) => (
            <StyledPasswordInput
              type={name}
              style={gs.inputContainer}
              error={errors[name]?.type}
              onChangeText={onChange}
              value={value}
              ref={keyboards['ref3']}
              maxLength={63}
              autoCapitalize="none"
              onSubmitEditing={handleSubmit(request)}
            />
          )}
        />
      </View>
      <LoadingButton
        style={[gs.button, { backgroundColor: colors.secondary }]}
        onPress={handleSubmit(request)}
        loading={loading}
      >
        {t('next')}
      </LoadingButton>
    </View>
  );
};

const s = StyleSheet.create({
  inputsContainer: { gap: DEVICE.height * 0.03 }
});
