import { useLocation } from 'react-router-dom';
import { CenteredPage } from '../components/layout/CenteredPage';
import { LoginForm } from '../components/auth/LoginForm/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm/RegisterForm';

export const AuthView = () => {
  const { pathname } = useLocation();
  const isRegister = pathname === '/registro';

  return (
    <CenteredPage>
      {isRegister ? <RegisterForm /> : <LoginForm />}
    </CenteredPage>
  );
};
