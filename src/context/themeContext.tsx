import { createContext, ReactNode, useEffect, useState } from 'react';
import { getTheme, ThemeName } from '../style/theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../style/global';

const DEFAULT_THEME_NAME = 'light';
const THEME_LOCALSTORAGE_KEY = 'book_store_theme';

interface State {
  themeName: ThemeName;
  setThemeName: () => void;
}

interface ThemeContextProps {
  themeName: ThemeName;
  toggleTheme: () => void;
}

export const state: State = {
  themeName: 'light' as ThemeName,
  setThemeName: () => {},
};
export const ThemeContext = createContext<ThemeContextProps>({
  themeName: 'light',
  toggleTheme: () => {},
});

export const BookStoreThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [themeName, setThemeName] = useState<ThemeName>('light');
  const toggleTheme = () => {
    setThemeName(themeName === 'light' ? 'dark' : 'light');
    localStorage.setItem(
      THEME_LOCALSTORAGE_KEY,
      themeName === 'light' ? 'dark' : 'light',
    );
  };
  useEffect(() => {
    const savedThemeName = localStorage.getItem(
      THEME_LOCALSTORAGE_KEY,
    ) as ThemeName;

    setThemeName(savedThemeName || DEFAULT_THEME_NAME);
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName="light" />

        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
