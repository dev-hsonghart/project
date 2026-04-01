import Footer from './components/common/Footer';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Error from './components/common/Error';
import { GlobalStyle } from './style/global';
import { ThemeProvider } from 'styled-components';
import { ThemeName, getTheme } from './style/theme';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import { useContext, useState } from 'react';
import { BookStoreThemeProvider, ThemeContext } from './context/themeContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: <Error />,
  },
  {
    path: '/books',
    element: (
      <Layout>
        <div>Books Page</div>
      </Layout>
    ),
  },
  {
    path: '/signup',
    element: (
      <Layout>
        <Signup />
      </Layout>
    ),
  },
]);

function App() {
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <BookStoreThemeProvider>
      <ThemeSwitcher />

      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  );
}

export default App;
