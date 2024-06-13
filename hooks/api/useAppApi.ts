import { ChangePasswordForm } from '@/constants/types';
import useApi, { UseApiProcess } from './useApi';
import { useTranslation } from 'react-i18next';
import { useToastController } from '@tamagui/toast';

const useAppApi = () => {
  const { post } = useApi();

  const { t } = useTranslation('form');
  const toast = useToastController();

  const changePassword: UseApiProcess<ChangePasswordForm> = {
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

  return { changePassword };
};

export default useAppApi;
