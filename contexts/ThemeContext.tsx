import themes, { Theme, ThemeObject } from 'assets/themes/themes';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

export type ThemeContextType = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  colors: ThemeObject;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }) => {
  if (__DEV__) console.log('🙌 - ThemeProvider');

  const [theme, setTheme] = useState<Theme>(() => 'dark');
  const [colors, setColors] = useState<ThemeObject>(() => themes.dark);

  useEffect(() => {
    setColors(themes[theme]);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
