import { LoginForm } from '@/constants/types';
import useApi from './useApi';
import RULES from '@/constants/rules';
import { useTranslation } from 'react-i18next';
import { useToastController } from '@tamagui/toast';

const useAuthApi = () => {
  const { post } = useApi();
  const { t } = useTranslation('auth');
  const toast = useToastController();

  const login = {
    process: async (data: LoginForm) => {
      // Wait 250ms so user can see the loading state
      await new Promise((resolve) => setTimeout(resolve, 250));

      const { identifier, password } = data;

      if (!RULES.identifier.pattern.test(identifier) || !RULES.password.pattern.test(password)) {
        throw new Error(t('error.invalid_credentials'), { cause: 'invalid_credentials' });
      }

      return post('/auth/login', data);
    },
    onSuccess: (data: any) => {
      // TODO: Handle success
      console.log('success', data);
    },
    onError: (error: any) => {
      if (error?.cause === 'invalid_credentials') {
        toast.show(error.message);
        return;
      }

      // TODO: Handle other errors
      console.log('error', error);
    },
  };

  return { login };
};

export default useAuthApi;
