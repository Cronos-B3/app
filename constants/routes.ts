const authPrefix = '/(auth)/a';

const registerPrefix = authPrefix + '/register';

const AUTH_ROUTES = {
  login: authPrefix + '/login',
  policies: registerPrefix + '/policies',
  privateData: registerPrefix + '/private-data',
  publicData: registerPrefix + '/public-data',
};

const APP_ROUTES = {
  home: '/(app)/a/(private)/home',
};

export { AUTH_ROUTES as AUTHR, APP_ROUTES as APPR };
