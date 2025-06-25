import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reseta estilos globais com base no tema */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

