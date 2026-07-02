import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, InputAdornment } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Form } from '../Form/Form';
import { isForgotPasswordFormValid } from '../../../utils/auth';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../../Redux/authSlice';
import { useAppSnackbar } from '../../../hooks/useAppSnackbar';
import '../LoginForm/styles.scss';

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notifySuccess, notifyError } = useAppSnackbar();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = isForgotPasswordFormValid({ email });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    try {
      const result = await dispatch(forgotPassword({ email: email.trim() }));

      if (forgotPassword.rejected.match(result)) {
        notifyError(
          result.payload || result.error?.message || 'No se pudo procesar la solicitud. Intentá de nuevo.'
        );
        return;
      }

      const { message, token } = result.payload ?? {};

      if (token) {
        notifySuccess(message || 'Se generó un código de recuperación');
        navigate(`/reset-password?token=${encodeURIComponent(token)}`);
        return;
      }

      notifySuccess(message || 'Si el email existe se enviarán instrucciones');
      navigate('/login');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      title="Recuperar contraseña"
      subtitle="Ingresá tu email y te enviaremos instrucciones para restablecer tu acceso."
      onSubmit={handleSubmit}
      footerText="¿Recordaste tu contraseña?"
      footerActionText="Iniciar sesión"
      footerActionTo="/login"
      maxWidth="420px"
    >
      <Box className="form-field">
        <Typography variant="caption" className="field-label">
          Email
        </Typography>
        <TextField
          fullWidth
          required
          variant="outlined"
          placeholder="usuario@wepadel.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmailIcon className="field-icon" />
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
        sx={{ py: '12px', mt: 2 }}
      >
        {submitting ? 'Enviando...' : 'Continuar'}
      </Button>
    </Form>
  );
};
