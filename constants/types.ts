// All form typescript types

export type LoginForm = {
  identifier: string;
  password: string;
};

// All api typescript types

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type OptionalsData = {
  timeout?: number;
};
