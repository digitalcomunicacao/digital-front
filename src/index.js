import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import theme from './theme/theme';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reseta estilos globais com base no tema */}
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            background: theme.palette.background.default,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            minHeight: '100vh',
          },
        }}
      />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

