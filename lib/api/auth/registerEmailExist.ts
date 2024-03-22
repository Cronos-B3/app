import { HttpMethod } from 'hooks/useAPI';

const url = '/auth/register/email-exist';
const method = 'POST' as HttpMethod;

interface PostData {
  email: string;
}

const post = (rawData: PostData) => {
  const data = {
    u_email: rawData.email
  };

  return { method, url, data };
};

export default { post };
