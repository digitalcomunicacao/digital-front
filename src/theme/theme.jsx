// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFB800',
    },
    secondary: {
      main: '#141E30', 
    },
    background: {
      default: '#141E30',
      paper: '#0D68F914', 
      paperSolid: '#0D68F9',  
      paperAzul:"#0D68F9"
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#0D68F9', 
      tertiary:"#CBDAFB"
    },
divider: '#40619D',
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
        containedPrimary: {
          backgroundColor: '#FFB800',
          color: '#0A1128',
          '&:hover': {
            backgroundColor: '#dba600', // Amarelo escurecido mais fechado
            boxShadow: '0 4px 12px rgba(255, 184, 0, 0.25)', // Sombra sutil
          },
        },
        outlinedPrimary: {
          borderColor: '#FFB800',
          color: '#FFB800',
          '&:hover': {
            borderColor: '#dba600', // Combina com o hover do `contained`
            backgroundColor: 'rgba(255, 184, 0, 0.08)', // Bem leve, não chama muita atenção
          },
        },
      },
    },

  },
});

export default theme;
