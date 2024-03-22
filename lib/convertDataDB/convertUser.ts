import checkNull from 'lib/checkNull';

type UserDBType = {
  u_email: string;
  u_username: string;
  u_nickname: string;
  u_birthdate: string | null;
  u_role: 'ROLE_USER';
};

export default (dbUser: UserDBType) => {
  const user = {
    email: dbUser.u_email,
    username: dbUser.u_username,
    nickname: checkNull(dbUser.u_nickname),
    birthdate: checkNull(dbUser.u_birthdate),
    role: dbUser.u_role
  };

  return user;
};
