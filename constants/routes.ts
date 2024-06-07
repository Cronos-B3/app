const authPrefix = '/(auth)/a';

const registerPrefix = authPrefix + '/register';

const AUTH_ROUTES = {
  login: authPrefix + '/login',
  policies: registerPrefix + '/policies',
};

export { AUTH_ROUTES as AR };
