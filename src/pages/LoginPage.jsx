import { Box, Container } from '@mui/material';
import { LoginForm } from '../components/auth/LoginForm/LoginForm';
import { Footer } from '../components/general/footer/Footer';

export const LoginPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 64px)', // Deduct header height to prevent extra scrolling
        bgcolor: 'background.default',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 4, sm: 8 },
          px: 2,
        }}
      >
        <LoginForm />
      </Container>
      <Footer />
    </Box>
  );
};
