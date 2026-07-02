import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ requireAdmin = false }) => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = Boolean(user?.token);
  const isAdmin = user?.rol === 'ADMINISTRADOR';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
