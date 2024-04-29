import { AxiosError } from 'axios';
import { Toast } from 'react-native-toast-notifications';
import { useTranslation } from 'react-i18next';
import { useUserStore } from './store/useUserStore';
import { useTokenStore } from './store/useTokenStore';

export default () => {
  const { logout } = useUserStore();
  const { removeToken } = useTokenStore();
  const { t } = useTranslation('error');

  const handleError = (error: unknown, doDisconnect = true): AxiosError['response'] | undefined => {
    if (!(error instanceof AxiosError)) {
      if (__DEV__) console.error('🔴 - APP ERROR');
      if (__DEV__) console.log('🔴 - ', error);
      Toast.show(t('generic'), { type: 'danger' });
      return;
    }

    if (error.code === 'ERR_NETWORK') {
      if (__DEV__) console.error('🔴 - NO CONNECTION');
      Toast.show(t('disconnected'), { type: 'danger' });
      return;
    }

    if (!error.response) {
      if (__DEV__) console.error('🔴 - NO RESPONSE');
      Toast.show(t('went_wrong'), { type: 'danger' });
      return;
    }

    switch (error.response.status) {
      case 400:
        if (__DEV__) console.error('🔴 - BAD REQUEST');
        Toast.show(t('went_wrong'), { type: 'danger' });
        return;

      case 401:
        if (!doDisconnect) break;
        if (__DEV__) console.error('🔴 - TOKEN NOT VALID');
        logout();
        removeToken();
        return;

      case 405:
        if (__DEV__) console.error('🔴 - METHOD NOT ALLOWED');
        Toast.show(t('went_wrong'), { type: 'danger' });
        return;

      case 422:
        Toast.show(t('unprocessable_entity'), { type: 'danger' });
        break;

      case 429:
        if (__DEV__) console.error('🔴 - TOO MANY REQUESTS');
        Toast.show(t('too_many_requests'), { type: 'danger' });
        return;

      case 500:
        if (__DEV__) console.error('🔴 - INTERNAL SERVER ERROR');
        Toast.show(t('server'), { type: 'danger' });
        return;

      case 503:
        if (__DEV__) console.error('🔴 - SERVICE UNAVAILABLE');
        Toast.show(t('server'), { type: 'danger' });
        return;
    }
    return (error as AxiosError).response;
  };

  return { handleError };
};
