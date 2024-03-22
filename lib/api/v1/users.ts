import { HttpMethod } from 'hooks/useAPI';

interface GetData {
  token: string;
}

const get = (data: GetData) => {
  return { method, url, data };
};

export default { get };
