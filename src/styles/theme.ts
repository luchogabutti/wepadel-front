import { createTheme } from '@mui/material/styles';

/**
 * Tema global de MUI para WePadel basado en los tokens originales.
 */
export const theme = createTheme({
  palette: {
    // Al ser un fondo oscuro y texto claro, habilitamos el modo oscuro por defecto
    mode: 'dark',
    primary: {
      main: '#0066FF',
    },
    secondary: {
      main: '#141C24',
    },
    // En MUI, podemos mapear tu color terciario a "success" o "info" si se usa para eso,
    // o declararlo dentro de la paleta.
    success: {
      main: '#00CC99', 
    },
    error: {
      main: '#FF4444',
    },
    background: {
      default: '#0C0B12',
      paper: '#141C24', // Usado para tarjetas, modales y headers
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A0AEC0',
    },
  },
  typography: {
    fontFamily: '"Outfit", system-ui, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '38px',
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '21px',
    },
    body1: {
      fontWeight: 400,
      fontSize: '15px',
    },
    caption: {
      fontWeight: 500,
      fontSize: '12px',
    },
  },
  shape: {
    // MUI usa un número base para el radio de los bordes.
    // 8px corresponde a tu "md".
    borderRadius: 8,
  },
  components: {
    // Aquí puedes personalizar componentes específicos
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // --radius-md
          textTransform: 'none', // Quita las mayúsculas automáticas de MUI
        },
      },
    },
  },
});
