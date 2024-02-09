import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type UserProps = {
  token: string;
  u_id: string;
  u_username: string;
  u_nickname: string;
  u_email: string;
} | null;

export type UserContextType = {
  user: UserProps;
  setUser: Dispatch<SetStateAction<UserProps>>;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }) => {
  if (__DEV__) console.log('🙌 - UserProvider');

  const [user, setUser] = useState<UserProps | null>(() => null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) throw new Error('useUser must be used within a UserProvider');
  return context;
};
