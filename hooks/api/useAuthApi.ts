import { LoginForm, RegisterForm } from '@/constants/types';
import useApi, { UseApiProcess } from './useApi';
import { useTranslation } from 'react-i18next';
import { useToastController } from '@tamagui/toast';
import { router } from 'expo-router';
import { APPR } from '@/constants/routes';

const useAuthApi = () => {
  const { post } = useApi();
  const { t } = useTranslation('auth');
  const toast = useToastController();

  const login: UseApiProcess<LoginForm> = {
    process: async (data) => post('/auth/login', data),
    onSuccess: (data: any) => {
      // TODO: Handle success
      console.log('success', data);
      router.push(APPR.home);
    },
    onError: (error) => {
      // TODO: Handle other errors
      console.log('error', error);
    },
    onFormError: () => toast.show(t('error.credentials')),
  };

  const register: UseApiProcess<RegisterForm> = {
    process: async (data) => post('/auth/register', data),
    onSuccess: (data) => {
      // TODO: Handle success
      console.log('success', data);
    },
    onError: (error) => {
      // TODO: Handle other errors
      console.log('error', error);
    },
  };

  return { login, register };
};

export default useAuthApi;
