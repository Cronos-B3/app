import axios from 'axios';
import { useCallback, useState } from 'react';
import { useTokenStore } from './store/tokenStore';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface CallParams {
  method: HttpMethod;
  url: string;
  data?: object;
  tokenHeader?: string | null;
}

interface CallData {
  data?: object;
  params?: object;
}

export const useAPI = (baseURL?: string) => {
  const { token } = useTokenStore();

  const [loading, setLoading] = useState<boolean>(() => false);

  const call = useCallback(
    async ({ method, url, data = {}, tokenHeader = token }: CallParams) => {
      setLoading(true);

      if (__DEV__) console.log(`🛎️ - ${method} - ${baseURL ?? axios.defaults.baseURL + url}`);

      // Adapt the data to the method for axios
      const callData: CallData = ['GET', 'DELETE'].includes(method) ? { params: data } : { data };

      try {
        const { config, data, request, status, statusText } = await axios({
          method,
          baseURL,
          headers: { Authorization: tokenHeader ? `Bearer ${tokenHeader}` : '' },
          url,
          ...callData
        });

        if (__DEV__) {
          console.log('📀📀 - Request Response');
          console.log('📀 - config', config);
          console.log('📀 - data', data.data);
          console.log('📀 - metadata', data.metadata);
          console.log('📀 - request', request);
          console.log(`📀 - status: ${status} - ${statusText}`);
          console.log('📀📀 - End Request Response');
        }

        return data.data;
      } catch (error) {
        if (__DEV__) console.error('🔥 - error', error);

        if (error.code === 'ERR_NETWORK') {
          if (__DEV__) console.error('ERR_NETWORK');
          // TODO: GO TO OFFLINE PAGE
          return;
        }

        switch (error.response?.status) {
          case 400:
            if (__DEV__) console.error('BAD REQUEST');
            break;

          case 401:
            if (__DEV__) console.error('TOKEN NOT VALID');
            break;

          case 403:
            if (__DEV__) console.error('USER DO NOT HAVE ACCESS TO THIS RESOURCE');
            break;

          case 405:
            if (__DEV__) console.error('METHOD NOT ALLOWED');
            break;

          case 429:
            if (__DEV__) console.error('TOO MANY REQUESTS');
            break;

          case 500:
            if (__DEV__) console.error('INTERNAL SERVER ERROR');
            // TODO: GO TO OFFLINE PAGE
            break;

          case 503:
            if (__DEV__) console.error('SERVICE UNAVAILABLE');
            // TODO: GO TO OFFLINE PAGE
            break;

          default:
          // error not handled here
        }
        throw error.response;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { loading, call };
};
