import { createTheme, alpha } from '@mui/material/styles';

export const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: {
      main: '#0066FF',
      light: '#B3C5FF',
      dark: '#003fa4',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#141C24',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#00CC99',
      contrastText: '#0C0B12',
    },
    error: {
      main: '#FF4444',
      dark: '#CC0000',
    },
    background: {
      default: '#0C0B12',
      paper: '#141C24',
    },
    surface: {
      main: '#1c1b22',
      light: '#201f26',
      dark: '#2a2931',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A0AEC0',
      emphasis: '#e5e1eb',
      label: '#c2c6d8',
      hint: '#8c90a1',
    },
    divider: 'rgba(255, 255, 255, 0.05)',
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
        root: ({ theme }) => ({
          backgroundImage: 'none',
          backgroundColor: alpha(theme.palette.background.default, 0.8),
          backdropFilter: 'blur(12px)',
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }),
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.surface.light,
          borderRadius: 8,
          color: theme.palette.text.emphasis,
          '& fieldset': {
            borderColor: alpha(theme.palette.text.hint, 0.3),
          },
          '&:hover fieldset': {
            borderColor: alpha(theme.palette.primary.light, 0.3),
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.3)}`,
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.label,
          '&.Mui-focused': {
            color: theme.palette.primary.light,
          },
        }),
      },
    },
  },
});
