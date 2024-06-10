// Form types

export type LoginForm = {
  id_or_email: string;
  password: string;
};

export type PoliciesForm = {
  old_enough: boolean;
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
