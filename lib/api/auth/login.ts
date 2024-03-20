import { HttpMethod } from 'hooks/useAPI';

const url = '/auth/login';
const method = 'POST' as HttpMethod;

interface PostData {
  login: string;
  password: string;
}

const post = (data: PostData) => {
  const loginData = {
    u_username: data.login,
    u_email: data.login,
    u_password: data.password
  };

  return { method, url, loginData };
};

export default { post };
