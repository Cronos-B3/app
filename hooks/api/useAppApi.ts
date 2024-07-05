import { ChangePasswordForm, MyUserType } from '@/constants/types';
import useApi, { UseApiForm, UseApiQuery } from './useApi';
import { useTranslation } from 'react-i18next';
import { useToastController } from '@tamagui/toast';
import useUserStore from '../store/useUserStore';
import { AxiosError } from 'axios';
import useTokenStore from '../store/useTokenStore';
import { router } from 'expo-router';
import { AUTHR } from '@/constants/routes';

const useAppApi = () => {
  const { get, post } = useApi();

  const { t } = useTranslation('form');
  const { setUser } = useUserStore();
  const { removeToken } = useTokenStore();
  const toast = useToastController();

  const getMe: UseApiQuery = {
    queryKey: ['me'],
    process: async () => get('/v1/me'),
    onSuccess: (data: MyUserType) => setUser(data),
    onError: (error) => {
      if (!(error instanceof AxiosError)) return;
      if (error.response?.status === 401) {
        removeToken();
        router.push(AUTHR.login);
      }
    },
  };
  const changePassword: UseApiForm<ChangePasswordForm> = {
    process: async (data) => post('', data),
    onSuccess: (data) => {
      // TODO: Handle success
      console.log('success', data);
    },
    onError: (error) => {
      // TODO: Handle other errors
      console.log('error', error);
    },
    onFormError: (error, doKeysError) => {
      if (error.password?.type === 'required') {
        toast.show(t('error.password.required'));
        return;
      }

      if (!doKeysError(error)) return;

      if (error.password && error.password?.type !== 'required') {
        toast.show(t('error.password.incorrect'));
        return;
      }
    },
  };

  return { getMe, changePassword };
};

export default useAppApi;
