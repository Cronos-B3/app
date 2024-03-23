import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { Toast } from 'react-native-toast-notifications';

const useErrorHandling = () => {
  const { t } = useTranslation('error');

  const handleError = (error: any) => {
    if (!(error instanceof AxiosError)) {
      if (__DEV__) console.log('🔴 - error', error);

      switch (error.code) {
        case -1:
          Toast.show(t('server'), { type: 'danger' });
          break;

        default:
          Toast.show(t('generic'), { type: 'danger' });
      }
      return;
    }

    if (!error.response) {
      Toast.show(t('network'), { type: 'danger' });
      return;
    }

    return (error as AxiosError).response;
  };

  return { handleError };
};

export default useErrorHandling;
