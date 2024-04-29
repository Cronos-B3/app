import axios, { AxiosError } from 'axios';
import { useTokenStore } from 'hooks/store/useTokenStore';
import { useCallback, useState } from 'react';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

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

  const call = useCallback(async ({ method, url, data = {}, tokenHeader = token }: CallParams) => {
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
        // console.log('📀 - config', config);
        // console.log('📀 - data', data.data);
        // console.log('📀 - metadata', data.metadata);
        // console.log('📀 - request', request);
        console.log(`📀 - status: ${status} - ${statusText}`);
        console.log('📀📀 - End Request Response');
      }

      return data.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, call };
};
