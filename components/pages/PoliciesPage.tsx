import { Trans, useTranslation } from 'react-i18next';
import AuthTemplate from '../templates/AuthTemplate';
import { YStack } from 'tamagui';
import CheckboxWithLabel from '../molecules/CheckboxWithLabel';
import { Controller } from 'react-hook-form';
import { PoliciesForm } from '@/constants/types';
import { router } from 'expo-router';
import { AR } from '@/constants/routes';
import Text from '../atoms/Text';
import useForm from '@/hooks/useForm';

export default function PoliciesPage() {
  if (__DEV__) console.log('📃 - PoliciesPage');

  const { t } = useTranslation();

  const { control, onSubmit, watch } = useForm<PoliciesForm>({
    defaultValues: {
      old_enough: false,
      terms: false,
      privacy: false,
    },
    delay: 0,
    onSuccess: () => router.push(AR.privateData),
  });

  const checkboxChecked = watch('old_enough') && watch('terms') && watch('privacy');

  const CheckboxPolicies = ({ name }: { name: keyof PoliciesForm }) => (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({ field: { value, onChange, name } }) => (
        <CheckboxWithLabel onCheckedChange={onChange} checked={value}>
          <Trans
            t={t}
            i18nKey={`auth:${name}`}
            components={{ underline: <Text unstyled textDecorationLine="underline" /> }}
          />
        </CheckboxWithLabel>
      )}
    />
  );

  return (
    <AuthTemplate
      button={{
        children: t('next'),
        disabled: !checkboxChecked,
        disabledStyle: { opacity: 0.75 },
        onPress: onSubmit,
      }}
      alignItems="center">
      <YStack flex={1} justifyContent="space-evenly">
        <CheckboxPolicies name="old_enough" />
        <CheckboxPolicies name="terms" />
        <CheckboxPolicies name="privacy" />
      </YStack>
    </AuthTemplate>
  );
}
