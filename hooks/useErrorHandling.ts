import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';

function useErrorHandling() {
  const { t } = useTranslation('error');
  const toast = useToast();

  const handleError = (error: any) => {
    if (!(error instanceof AxiosError)) {
      if (__DEV__) console.log('🔴 - error', error);

      switch (error.code) {
        case -1:
          toast.show(t('server'), { type: 'danger' });
          break;

        default:
          toast.show(t('generic'), { type: 'danger' });
      }
      return;
    }

    if (!error.response) {
      toast.show(t('network'), { type: 'danger' });
      return;
    }

    return (error as AxiosError).response;
  };

  return { handleError };
}

export default useErrorHandling;
