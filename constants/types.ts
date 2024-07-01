// User types

export type UserType = {
  identifier: string;
  username: string;
  profilePicture: string;
  bannerPicture: string;
  bio: string;
  followers: number;
  follows: number;
};

export type MyUserType = UserType & {
  email: string;
};

export type ProfileUserType = UserType & {
  numFollowers: string;
};

export type PostType = {
  id: string;
  username: UserType['username'];
  profilePicture: UserType['profilePicture'];
  content: string;
  isLiked: boolean;
  likes: number;
  isUpvoted: boolean;
  upvotes: number;
  finishedAt: string;
};

// Form types

export type LoginForm = {
  idOrEmail: string;
  password: string;
};

export type PoliciesForm = {
  oldEnough: boolean;
  terms: boolean;
  privacy: boolean;
};

export type RegisterForm = {
  identifier: string;
  username: string;
  email: string;
  profilePicture?: any; // TODO: type
  password: string;
  passwordConfirmation: string;
};

export type ChangePasswordForm = {
  password: string;
  newPassword: string;
  newPasswordConfirmation: string;
};

export type PostForm = {
  content: string;
  finishedAt: number;
};

// API types

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type OptionalsData = {
  timeout?: number;
};
