import checkNull from 'lib/checkNull';

type UserDBType = {
  u_email: string;
  u_username: string;
  u_nickname: string;
  u_birthdate: string | null;
  u_profile_picture: string;
  u_banner_picture: string;
  u_role: 'ROLE_USER';
};

export default (dbUser: UserDBType) => {
  const user = {
    email: dbUser.u_email,
    username: dbUser.u_username,
    nickname: dbUser.u_nickname,
    birthdate: checkNull(dbUser.u_birthdate),
    profile_picture: dbUser.u_profile_picture,
    banner_picture: dbUser.u_banner_picture,
    role: dbUser.u_role
  };

  return user;
};
