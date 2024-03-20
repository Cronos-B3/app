import { HttpMethod } from 'hooks/useAPI';

const url = '/auth/register';
const method = 'POST' as HttpMethod;

interface PostData {
  username: string;
  email: string;
  password: string;
  confirmationPassword: string;
}

const post = (rawData: PostData) => {
  const formattedData = {
    u_username: rawData.username,
    u_email: rawData.email,
    u_password: rawData.password,
    u_password_confirmation: rawData.confirmationPassword
  };

  return { method, url, formattedData };
};

export default { post };
