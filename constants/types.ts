// Form types

export type LoginForm = {
  identifier: string;
  password: string;
};

export type PoliciesForm = {
  old_enough: boolean;
  terms: boolean;
  privacy: boolean;
};

export type RegisterForm = {
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
  nickname: string;
};

// API types

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type OptionalsData = {
  timeout?: number;
};
