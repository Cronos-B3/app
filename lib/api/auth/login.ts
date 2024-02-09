import { HttpMethod } from 'hooks/useAPI';

const url = '/auth/login';

interface PostData {
  u_email: string;
  u_password: string;
}

const post = (data: PostData) => {
  return { method: 'POST' as HttpMethod, url, data: { ...data } };
};

export default { post };
