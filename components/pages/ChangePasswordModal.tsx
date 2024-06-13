import { useTranslation } from 'react-i18next';
import ModalTemplate from '../templates/ModalTemplate';
import FormInput from '../molecules/FormInput';
import LoadingButton from '../molecules/LoadingButton';
import { YStack } from 'tamagui';
import { DEVICE } from '@/constants/config';
import { useRef } from 'react';
import { TextInput } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { ChangePasswordForm } from '@/constants/types';
import useForm from '@/hooks/useForm';
import useAppApi from '@/hooks/api/useAppApi';
import RULES from '@/constants/rules';
import { Controller } from 'react-hook-form';
import Text from '../atoms/Text';

export default function ChangePasswordModal() {
  if (__DEV__) console.log('📃 - ChangePasswordModal');

  const { t } = useTranslation();
  const { changePassword } = useAppApi();

  const refs = {
    password: useRef<TextInput>(null),
    newPassword: useRef<TextInput>(null),
    newPasswordConfirmation: useRef<TextInput>(null),
  };

  const { mutate: fetchChangePassword, isPending } = useMutation({
    mutationFn: changePassword.process,
    onSuccess: changePassword.onSuccess,
    onError: changePassword.onError,
  });

  const { control, onSubmit, watch, isFormPending } = useForm<ChangePasswordForm>({
    defaultValues: {
      password: '',
      newPassword: '',
      newPasswordConfirmation: '',
    },
    keysError: ['newPassword', 'newPasswordConfirmation'],
    onSuccess: fetchChangePassword,
    onError: changePassword.onFormError,
  });

  return (
    <ModalTemplate
      height={55}
      title={t('app:changePassword')}
      bottomPadding
      justifyContent="space-between">
      <Controller
        control={control}
        name="password"
        rules={{ required: true, ...RULES.password }}
        render={({ field: { onChange, value, name } }) => (
          <FormInput
            ref={refs[name]}
            type={name}
            onChangeText={onChange}
            value={value}
            onSubmitEditing={() => refs.newPassword.current?.focus()}
          />
        )}
      />
      <YStack gap={DEVICE.height * 0.02}>
        <Controller
          control={control}
          name="newPassword"
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
                  {t('auth:passwordRequirements')}
                </Text>
              }
              onChangeText={onChange}
              value={value}
              onSubmitEditing={() => refs.newPassword.current?.focus()}
            />
          )}
        />
        <Controller
          control={control}
          name="newPasswordConfirmation"
          rules={{ validate: (value) => value === watch('newPassword') }}
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
      <LoadingButton
        borderRadius={'$round'}
        onPress={onSubmit}
        isLoading={isPending || isFormPending}>
        {t('confirm')}
      </LoadingButton>
    </ModalTemplate>
  );
}
