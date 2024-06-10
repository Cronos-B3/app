import useForm from '@/hooks/useForm';
import AuthTemplate from '../templates/AuthTemplate';
import { useRegister } from '@/contexts/RegisterContext';
import { RegisterForm } from '@/constants/types';
import { useMutation } from '@tanstack/react-query';
import useAuthApi from '@/hooks/api/useAuthApi';
import { Controller } from 'react-hook-form';
import RULES from '@/constants/rules';
import FormInput from '../molecules/FormInput';
import Text from '../atoms/Text';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { TextInput } from 'react-native';
import { DEVICE } from '@/constants/config';

export default function PublicDataPage() {
  if (__DEV__) console.log('📃 - PublicDataPage');

  const { register } = useAuthApi();
  const { t } = useTranslation('auth');

  const refs = {
    identifier: useRef<TextInput>(null),
    username: useRef<TextInput>(null),
  };

  const { mutate: fetchRegister, isPending } = useMutation({
    mutationFn: register.process,
    onSuccess: register.onSuccess,
    onError: register.onError,
  });

  const { registerForm } = useRegister();

  const { control, onSubmit, isFormPending } = useForm<RegisterForm>({
    defaultValues: registerForm,
    onSuccess: fetchRegister,
    keysError: ['identifier', 'username'],
  });

  return (
    <AuthTemplate
      button={{
        isLoading: isPending || isFormPending,
        onPress: onSubmit,
      }}
      gap={DEVICE.height * 0.06}>
      {/* <Controller
        control={control}
        name="profile_picture"
        render={({ field: { onChange, value, name } }) => <></>}
      /> */}
      <Controller
        control={control}
        name="identifier"
        rules={{ required: true, ...RULES.identifier }}
        render={({ field: { onChange, value, name } }) => (
          <FormInput
            ref={refs[name]}
            type={name}
            onChangeText={onChange}
            value={value}
            onSubmitEditing={() => refs.username.current?.focus()}
            subLabel={
              <Text color={'$inversed75'} fontSize={'$1'} numberOfLines={undefined}>
                {t('identifier_requirements')}
              </Text>
            }
          />
        )}
      />
      <Controller
        control={control}
        name="username"
        rules={{ required: true }}
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
    </AuthTemplate>
  );
}
