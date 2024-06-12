const authPrefix = '/(auth)/a';

const registerPrefix = authPrefix + '/register';

const AUTH_ROUTES = {
  login: authPrefix + '/login',
  policies: registerPrefix + '/policies',
  privateData: registerPrefix + '/private-data',
  publicData: registerPrefix + '/public-data',
};

const appPrefix = '/(app)/a';

const mainAppPrefix = appPrefix + '/(private)';

const APP_ROUTES = {
  home: mainAppPrefix + '/home',
  myProfile: mainAppPrefix + '/profile',
};

const menuPrefix = appPrefix + '/(menu)';

const MODAL_ROUTES = {
  menu: menuPrefix + '/menu',
  settings: menuPrefix + '/settings',
  search: menuPrefix + '/search',
  post: menuPrefix + '/post',
};

export { AUTH_ROUTES as AUTHR, APP_ROUTES as APPR, MODAL_ROUTES as MODALR };
