import login from './auth/login';
import register from './auth/register';
import registerEmailExist from './auth/registerEmailExist';
import crons from './v1/crons';
import users from './v1/users';

const v1 = {
  users,
  crons
};

const auth = {
  login,
  register,
  registerEmailExist
};

export { auth, v1 };
