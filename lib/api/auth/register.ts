import { HttpMethod } from 'hooks/useAPI';

const url = '/auth/register';
const method = 'POST' as HttpMethod;

interface PostData {
  username: string;
  nickname: string;
  birthdate: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const post = (rawData: PostData) => {
  const data = {
    u_username: rawData.username,
    u_nickname: rawData.nickname.length !== 0 ? rawData.nickname : rawData.username,
    u_birthdate: rawData.birthdate,
    u_email: rawData.email,
    u_password: rawData.password,
    u_password_confirmation: rawData.password_confirmation
  };

  return { method, url, data };
};

export default { post };
