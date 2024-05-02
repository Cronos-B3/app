import axios from 'axios';
import { useCallback, useState } from 'react';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface CallParams {
  method: HttpMethod;
  url: string;
  data?: object;
  optionals?: { token?: string; timeout?: number };
}

interface CallData {
  data?: object;
  params?: object;
}

export const useAPI = (baseURL?: string) => {
  const [loading, setLoading] = useState<boolean>(() => false);

  const call = useCallback(async ({ method, url, data = {}, optionals }: CallParams) => {
    setLoading(true);

    if (__DEV__) console.log(`🛎️ - ${method} - ${baseURL ?? axios.defaults.baseURL + url}`);

    // Adapt the data to the method for axios
    const callData: CallData = ['GET'].includes(method) ? { params: data } : { data };
    const optionalsData = {};

    if (optionals?.timeout) Object.assign(optionalsData, { timeout: optionals.timeout });

    const headers = {};

    if (optionals?.token) Object.assign(headers, { Authorization: `Bearer ${optionals.token}` });

    try {
      const { config, data, request, status, statusText } = await axios({
        method,
        baseURL,
        headers,
        url,
        ...callData,
        ...optionalsData
      });

      if (__DEV__) {
        console.log('📀📀 - Request Response');
        console.log('📀 - url', config.baseURL + (config.url ?? ''));
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
