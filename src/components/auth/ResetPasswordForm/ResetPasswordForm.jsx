import { useState } from 'react';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Form } from '../Form/Form';
import { isResetPasswordFormValid } from '../../../utils/auth';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../../Redux/authSlice';
import { useAppSnackbar } from '../../../hooks/useAppSnackbar';
import '../LoginForm/styles.scss';

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { notifySuccess, notifyError } = useAppSnackbar();
  const token = searchParams.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = Boolean(token) && isResetPasswordFormValid({ password, confirmPassword });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    try {
      const result = await dispatch(resetPassword({ token, newPassword: password }));

      if (resetPassword.rejected.match(result)) {
        notifyError(
          result.payload || result.error?.message || 'No se pudo restablecer la contraseña.'
        );
        return;
      }

      notifySuccess(result.payload?.message || 'Contraseña actualizada correctamente');
      navigate('/login');
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) {
    return (
      <Form
        title="Enlace inválido"
        subtitle="El código de recuperación no es válido. Solicitá uno nuevo."
        onSubmit={(e) => e.preventDefault()}
        footerText="¿Querés recuperar tu acceso?"
        footerActionText="Volver al formulario"
        footerActionTo="/recuperar-contrasena"
        maxWidth="420px"
      >
        <Button
          component={RouterLink}
          to="/recuperar-contrasena"
          fullWidth
          variant="contained"
          sx={{ py: '12px' }}
        >
          Recuperar contraseña
        </Button>
      </Form>
    );
  }

  return (
    <Form
      title="Nueva contraseña"
      subtitle="Elegí una contraseña segura para volver a acceder a tu cuenta."
      onSubmit={handleSubmit}
      footerText="¿Recordaste tu contraseña?"
      footerActionText="Iniciar sesión"
      footerActionTo="/login"
      maxWidth="420px"
    >
      <Box className="form-field">
        <Typography variant="caption" className="field-label">
          Nueva contraseña
        </Typography>
        <TextField
          fullWidth
          required
          variant="outlined"
          placeholder="••••••••"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText="Mínimo 12 caracteres, con mayúscula, número y símbolo."
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="button"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? (
                      <VisibilityOffIcon className="field-icon" />
                    ) : (
                      <VisibilityIcon className="field-icon" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Box className="form-field">
        <Typography variant="caption" className="field-label">
          Confirmar contraseña
        </Typography>
        <TextField
          fullWidth
          required
          variant="outlined"
          placeholder="••••••••"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPassword.length > 0 && password !== confirmPassword}
          helperText={
            confirmPassword.length > 0 && password !== confirmPassword
              ? 'Las contraseñas no coinciden.'
              : ' '
          }
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="button"
                    aria-label={
                      showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                    }
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    edge="end"
                    size="small"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon className="field-icon" />
                    ) : (
                      <VisibilityIcon className="field-icon" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={!canSubmit || submitting}
        endIcon={<ArrowForwardIcon />}
        sx={{ py: '12px', mt: 1 }}
      >
        {submitting ? 'Guardando...' : 'Restablecer contraseña'}
      </Button>
    </Form>
  );
};
