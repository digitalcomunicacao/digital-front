// themeDark.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E0A027',
      light: '#FFE9BC',
      dark: '#E0A027',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
      contained: '#2C2C2C',
      containedAzul: '#1A4DBF',
  paperAzul: "#E0A027"
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      tertiary: '#ffff',
    },
    divider: '#3A3A3A',
    lancamentos: '#03A982',
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
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          borderRadius: '10px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#1E1E1E',
        },
        notchedOutline: {
          borderColor: '#555',
        },
      },
    },
  },
});

export default theme;
