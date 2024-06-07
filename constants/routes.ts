const authPrefix = '/(auth)/a';

const registerPrefix = authPrefix + '/register';

const AUTH_ROUTES = {
  login: authPrefix + '/login',
  policies: registerPrefix + '/policies',
  privateData: registerPrefix + '/private-data',
  publicData: registerPrefix + '/public-data',
};

export { AUTH_ROUTES as AR };
