import { useRegister } from '@/contexts/RegisterContext';
import AuthTemplate from '../templates/AuthTemplate';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { RegisterForm } from '@/constants/types';

export default function PrivateDataPage() {
  if (__DEV__) console.log('📃 - PrivateDataPage');

  const { registerForm, setRegisterForm } = useRegister();
  const { t } = useTranslation();

  const { control, handleSubmit, watch } = useForm<RegisterForm>({
    defaultValues: registerForm,
  });

  return (
    <AuthTemplate
      button={{
        children: t('next'),
      }}></AuthTemplate>
  );
}
