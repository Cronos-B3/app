import { RegisterForm } from '@/constants/types';
import { createContext, ReactNode, useContext, useState } from 'react';

type RegisterContextType = {
  registerForm: RegisterForm;
  setRegisterForm: (form: RegisterForm) => void;
};

const RegisterContext = createContext<RegisterContextType | null>(null);

export const RegisterProvider = ({ children }: { children: ReactNode }) => {
  if (__DEV__) console.log('🙌 - RegisterProvider');

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    profile_picture: '',
    identifier: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    username: '',
  });

  return (
    <RegisterContext.Provider value={{ registerForm, setRegisterForm }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => {
  const context = useContext(RegisterContext);
  if (context === null) throw new Error('useRegister must be used within a RegisterProvider');
  return context;
};
