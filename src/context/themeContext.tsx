import { createContext, ReactNode, useState } from 'react';
import { getTheme, ThemeName } from '../style/theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../style/global';

interface State {
  themeName: ThemeName;
  setThemeName: (themeName: ThemeName) => void;
}

export const state: State = {
  themeName: 'light' as ThemeName,
  setThemeName: (themeName: ThemeName) => {},
};
export const ThemeContext = createContext<ThemeName>('light');

export const BookStoreThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [themeName, setThemeName] = useState<ThemeName>('light');
  const toggleTheme = () => {
    setThemeName(themeName === 'light' ? 'dark' : 'light');
  };
  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName="light" />

        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
