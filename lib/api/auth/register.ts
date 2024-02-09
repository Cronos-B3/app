import { HttpMethod } from 'hooks/useAPI';

const url = '/auth/register';

interface PostData {
  u_username: string;
  u_email: string;
  u_password: string;
  u_password_confirmation: string;
}

const post = (data: PostData) => {
  return { method: 'POST' as HttpMethod, url, data: { ...data } };
};

export default { post };
