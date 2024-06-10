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
  profile_picture: any;
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
  identifier: string;
};

// API types

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type OptionalsData = {
  timeout?: number;
};
