import login from './auth/login';
import register from './auth/register';
import users from './v1/users';

const v1 = {
  users
};

const auth = {
  login,
  register
};

export { auth, v1 };
