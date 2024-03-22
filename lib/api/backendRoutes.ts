import login from './auth/login';
import register from './auth/register';
import registerEmailExist from './auth/registerEmailExist';
import users from './v1/users';

const v1 = {
  users
};

const auth = {
  login,
  register,
  registerEmailExist
};

export { auth, v1 };
