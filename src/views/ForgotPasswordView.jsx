import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CenteredPage } from '../components/layout/CenteredPage';
import '../components/auth/Form/styles.scss';

export const ForgotPasswordView = () => (
  <CenteredPage>
    <Box className="generic-form-container" sx={{ maxWidth: '420px' }}>
      <Box className="ambient-light-top" />
      <Box className="ambient-light-bottom" />

      <Box className="surface-card form-card">
        <Box className="card-header">
          <ConstructionOutlinedIcon
            sx={{ fontSize: 48, color: 'primary.main', mb: 1 }}
            aria-hidden
          />
          <Typography variant="h4" className="card-title">
            Recuperar contraseña
          </Typography>
          <Typography variant="body2" className="card-subtitle">
            Esta función se encuentra en mantenimiento. Por ahora, contactá al equipo de soporte
            si necesitás ayuda para acceder a tu cuenta.
          </Typography>
        </Box>

        <Button
          component={RouterLink}
          to="/login"
          fullWidth
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{ py: '12px' }}
        >
          Volver al inicio de sesión
        </Button>
      </Box>
    </Box>
  </CenteredPage>
);
