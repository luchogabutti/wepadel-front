import { Box, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm/RegisterForm';

export const AuthPage = () => {
  const { pathname } = useLocation();
  const isRegister = pathname === '/registro';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 64px)',
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
        {isRegister ? <RegisterForm /> : <LoginForm />}
      </Container>
    </Box>
  );
};
