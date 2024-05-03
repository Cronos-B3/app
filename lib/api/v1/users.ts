import { CallParams } from 'hooks/useAPI';

const url = '/v1/users';

interface GetData {
  token: string;
}

const get = (data: GetData) => {
  return { method: 'GET', url, optionals: { token: data.token } } as CallParams;
};

export default { get };
