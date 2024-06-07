const authPrefix = '/(auth)/a';

const registerPrefix = authPrefix + '/register';

const AUTH_ROUTES = {
  login: authPrefix + '/login',
  policies: registerPrefix + '/policies',
};

const AUTH_API_ROUTES = {
  login: '',
};

export { AUTH_ROUTES as AR, AUTH_API_ROUTES as AAR };
