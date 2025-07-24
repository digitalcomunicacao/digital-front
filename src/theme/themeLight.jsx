// themeLight.ts
import { createTheme } from '@mui/material/styles';

const themeLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#E0A027', 
      light:"#FFE9BC",
      dark:"#E0A027"
    },
    secondary: {
      main: '#141E30'
    },
    background: {
      default: '#FFFFFF',
      paper: '#F6F6F6', 
      contained:"#22345F",
      containedAzul:"#0D68F9",
      paperAzul: '#FFE9BC'
    },
    text: {
      primary: '#22345F',
      secondary: '#939393',
      tertiary: '#fff',
    },
    divider: '#E8E8E8',
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
  },
});

export default themeLight;
