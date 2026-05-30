import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0066FF',        // Azul Eléctrico — CTAs, botones, acentos, links destacados
      light: '#B3C5FF',       // Azul suave — logos, labels, iconos, textos de acción secundarios
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#141C24',        // Gris Carbón — fondos de tarjetas, paneles laterales
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#00CC99',        // Turquesa/Teal — badges de descuento, stock disponible
      contrastText: '#0C0B12',
    },
    error: {
      main: '#FF4444',        // Rojo — errores, órdenes canceladas, stock agotado
    },
    background: {
      default: '#0C0B12',     // Negro Profundo — fondo base de toda la aplicación
      paper: '#141C24',       // Gris Carbón — tarjetas, modales, headers
    },
    text: {
      primary: '#FFFFFF',     // Blanco — texto principal sobre fondos oscuros
      secondary: '#A0AEC0',   // Gris claro — textos secundarios, metadatos, placeholders
    },
  },
  typography: {
    fontFamily: '"Outfit", system-ui, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '38px',
    },
    h4: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '18px',
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
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(12, 11, 18, 0.8)',
          backdropFilter: 'blur(12px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 700,
        },
      },
    },
  },
});
