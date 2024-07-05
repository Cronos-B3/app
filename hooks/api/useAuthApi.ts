import { LoginForm, RegisterForm, MyUserType } from '@/constants/types';
import useApi, { UseApiForm } from './useApi';
import { useTranslation } from 'react-i18next';
import { useToastController } from '@tamagui/toast';
import { router } from 'expo-router';
import { APPR } from '@/constants/routes';
import useUserStore from '../store/useUserStore';
import useTokenStore from '../store/useTokenStore';

const useAuthApi = () => {
  const { post } = useApi();
  const { t } = useTranslation('auth');
  const { setUser } = useUserStore();
  const { setToken } = useTokenStore();
  const toast = useToastController();

  const login: UseApiForm<LoginForm> = {
    process: async (data) => post('/v1/auth/login', data),
    onSuccess: ({ jwt, user }: { jwt: string; user: MyUserType }) => {
      setToken(jwt);
      setUser(user);
      router.push(APPR.home);
    },
    onError: (error) => {
      // TODO: Handle other errors
      console.log('error', error);
    },
    onFormError: () => toast.show(t('error.credentials')),
  };

  const register: UseApiForm<RegisterForm> = {
    process: async (data) => post('/v1/auth/register', data),
    onSuccess: ({ jwt, user }: { jwt: string; user: MyUserType }) => {
      setToken(jwt);
      setUser(user);
      router.push(APPR.home);
    },
    onError: (error) => {
      // TODO: Handle other errors
      console.log('error', error);
    },
  };

  return { login, register };
};

export default useAuthApi;
