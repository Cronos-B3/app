import { HttpMethod } from 'hooks/useAPI';

const url = '/v1/users';
const method = 'GET' as HttpMethod;

interface GetData {
  token: string;
}

const get = (data: GetData) => {
  return { method, url, data };
};

export default { get };
