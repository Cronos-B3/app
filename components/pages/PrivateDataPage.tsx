import { useRegister } from '@/contexts/RegisterContext';
import AuthTemplate from '../templates/AuthTemplate';
import { useTranslation } from 'react-i18next';
import { RegisterForm } from '@/constants/types';
import useForm from '@/hooks/useForm';
import { router } from 'expo-router';
import { AR } from '@/constants/routes';
import { Controller } from 'react-hook-form';
import RULES from '@/constants/rules';
import FormInput from '../molecules/FormInput';
import { TextInput } from 'react-native';
import { useRef } from 'react';
import { useToastController } from '@tamagui/toast';
import { YStack } from 'tamagui';
import { DEVICE } from '@/constants/config';
import Text from '../atoms/Text';

export default function PrivateDataPage() {
  if (__DEV__) console.log('📃 - PrivateDataPage');

  const { registerForm, setRegisterForm } = useRegister();
  const { t } = useTranslation('auth');
  const toast = useToastController();

  const refs = {
    email: useRef<TextInput>(null),
    password: useRef<TextInput>(null),
    password_confirmation: useRef<TextInput>(null),
  };

  const { control, onSubmit, isFormPending, watch } = useForm<RegisterForm>({
    defaultValues: registerForm,
    onSuccess: (data) => {
      setRegisterForm(data);
      router.push(AR.publicData);
    },
    onError: (error) => {
      const keys = ['email', 'password', 'password_confirmation'] as const;
      keys.every((key) => {
        const keyError = error[key];
        if (keyError) {
          console.log(keyError.type);
          toast.show(t(`error.${key}.${keyError.type}`));
          return false;
        }
        return true;
      });
    },
  });

  return (
    <AuthTemplate
      button={{
        isLoading: isFormPending,
        onPress: onSubmit,
      }}
      gap={DEVICE.height * 0.04}>
      <Controller
        control={control}
        name="email"
        rules={{ required: true, ...RULES.email }}
        render={({ field: { onChange, value, name } }) => (
          <FormInput
            ref={refs[name]}
            type={name}
            onChangeText={(text) => onChange(text.trim())}
            value={value}
            onSubmitEditing={() => refs.password.current?.focus()}
          />
        )}
      />
      <YStack gap={DEVICE.height * 0.03}>
        <Controller
          control={control}
          name="password"
          rules={{ required: true, ...RULES.password }}
          render={({ field: { onChange, value, name } }) => (
            <FormInput
              ref={refs[name]}
              type={name}
              subLabel={
                <Text
                  fontSize={'$1'}
                  color={'$inversed75'}
                  numberOfLines={2}
                  paddingHorizontal={'2%'}>
                  {t('password_requirements')}
                </Text>
              }
              onChangeText={onChange}
              value={value}
              onSubmitEditing={() => refs.password_confirmation.current?.focus()}
            />
          )}
        />
        <Controller
          control={control}
          name="password_confirmation"
          rules={{ validate: (value) => value === watch('password') }}
          render={({ field: { onChange, value, name } }) => (
            <FormInput
              ref={refs[name]}
              type={name}
              onChangeText={onChange}
              value={value}
              onSubmitEditing={onSubmit}
            />
          )}
        />
      </YStack>
    </AuthTemplate>
  );
}
