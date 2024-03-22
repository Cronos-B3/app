import axios from 'axios';

export default () => {
  // Set the default headers for axios.
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  // Set the default base URL for axios.
  axios.defaults.baseURL = `${process.env.EXPO_PUBLIC_CRONOS_API ?? 'http://localhost'}/api`;
};
