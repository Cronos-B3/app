import { UseControllerProps } from 'react-hook-form';

const RULES = {
  idOrEmail: {
    // Identifier must be an email or a username (only lowercase letters)
    pattern: /^[a-z]{3,}$|^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/i,
  } as UseControllerProps['rules'],
  identifier: {
    // Identifier must contain only letters and be at least 3 characters long
    pattern: /^[a-z]{0,}$/i,
    minLength: 3,
  } as UseControllerProps['rules'],
  password: {
    // Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit and be at least 8 characters long
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,}$/,
    minLength: 8,
  } as UseControllerProps['rules'],
  email: {
    // Email must be a valid email address
    pattern: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g,
  } as UseControllerProps['rules'],
} as const;

export default RULES;
