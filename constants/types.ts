// All form typescript types

export type LoginForm = {
  identifier: string;
  password: string;
};

export type PoliciesForm = {
  old_enough: boolean;
  terms: boolean;
  privacy: boolean;
};

// All api typescript types

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type OptionalsData = {
  timeout?: number;
};
