const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/;

export const isEmailValid = (email: string): boolean => {
  return emailRegex.test(email);
};

export const requiredString = (text: string): boolean => {
  return text.length > 0;
};