// themeLight.ts
import { createTheme } from '@mui/material/styles';

const themeLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#141E30', // azul padrão no claro
    },
    secondary: {
      main: '#141E30', // amarelo destaque no light
    },
    background: {
      default: '#f2f2f2',
      paper: '#fff', // fundo branco para cards, modais etc.
      paperAzul: '#E1A127'
    },
    text: {
      primary: '#0A1128',
      secondary: '#40619D',
      tertiary: '#4F5D75',
    },
    divider: '#E0E0E0',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
    button: { textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          padding: '8px 16px',
        },
     
        outlinedPrimary: {
          borderColor: '#0D68F9',
          color: '#0D68F9',
          '&:hover': {
            borderColor: '#0954cc',
            backgroundColor: 'rgba(13, 104, 249, 0.06)',
          },
        },
      },
    },
  },
});

export default themeLight;
