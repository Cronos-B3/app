import { CallParams } from 'hooks/useAPI';

const url = '/v1/crons';

interface GetData {
  token: string;
}

const get = (rawData: GetData) => {
  const data = {};

  return { method: 'GET', url, data, optionals: { token: rawData.token } } as CallParams;
};

interface PostData {
  text: string;
  end_at: string;
}

const post = (rawData: PostData) => {
  const data = {
    c_text: rawData.text,
    c_end_at: rawData.end_at
  };

  return { method: 'POST', url, data } as CallParams;
};

export default { get, post };
