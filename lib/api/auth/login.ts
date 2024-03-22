import { HttpMethod } from 'hooks/useAPI';

const url = '/auth/login';
const method = 'POST' as HttpMethod;

interface PostData {
  identifier: string;
  password: string;
}

const post = (rawData: PostData) => {
  const data = {
    identifier: rawData.identifier,
    u_password: rawData.password
  };

  return { method, url, data };
};

export default { post };
