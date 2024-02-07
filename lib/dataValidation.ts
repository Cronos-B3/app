const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/;

export const isEmailValid = (email: string): boolean => {
  return emailRegex.test(email);
};

export const isPasswordValid = (password: string): boolean => {
  return password.length > 0;
};