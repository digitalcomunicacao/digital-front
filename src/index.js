import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider, GlobalStyles } from '@mui/material';
import themeDark from './theme/theme';
import themeLight from './theme/themeLight';
import { ThemeProviderCustom, useThemeMode } from './context/ThemeContext';
import { DrawerProvider } from './context/DrawerContext'; // ✅ Importa o contexto

const ThemeWrapper = () => {
  const { darkMode } = useThemeMode();
  const currentTheme = darkMode ? themeDark : themeLight;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            background: currentTheme.palette.background.default,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            minHeight: '100vh',
          },
        }}
      />
      <App />
    </ThemeProvider>
  );
};

const Root = () => (
  <ThemeProviderCustom>
    <DrawerProvider>
      <ThemeWrapper />
    </DrawerProvider>
  </ThemeProviderCustom>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
