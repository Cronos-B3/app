// User types

export type UserType = {
  identifier: string;
  username: string;
  profilePicture?: any; // TODO: type
  backgroundPicture?: any; // TODO: type
  bio: string;
  numFollowers: string;
};

export type PostType = {
  id: string;
  username: UserType['username'];
  profilePicture: UserType['profilePicture'];
  content: string;
  liked: boolean;
  upvoted: boolean;
  timeLeft: number;
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
  profile_picture?: any; // TODO: type
  password: string;
  passwordConfirmation: string;
};

export type ChangePasswordForm = {
  password: string;
  newPassword: string;
  newPasswordConfirmation: string;
};

// API types

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type OptionalsData = {
  timeout?: number;
};
