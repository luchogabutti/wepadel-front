import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, TextField, FormControlLabel, Checkbox, Link, InputAdornment } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Form } from '../Form/Form';
import './styles.scss';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password, remember });
    // Aquí se manejaría el login
  };

  return (
    <Form
      title="Iniciar sesión"
      subtitle="Accede a tu equipamiento profesional"
      onSubmit={handleSubmit}
      footerText="¿No tenés cuenta?"
      footerActionText="Registrate"
      footerActionTo="/registro"
      maxWidth="420px"
    >
      {/* Email */}
      <Box className="form-field">
        <Typography variant="caption" className="field-label">
          Email
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="usuario@wepadel.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AlternateEmailIcon className="field-icon" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Contraseña */}
      <Box className="form-field">
        <Box className="password-label-row">
          <Typography variant="caption" className="field-label">
            Contraseña
          </Typography>
          <Link
            component={RouterLink}
            to="#"
            className="forgot-password-link"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </Box>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="••••••••"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LockIcon className="field-icon" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Recordarme */}
      <FormControlLabel
        control={
          <Checkbox
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            sx={{
              color: 'rgba(160, 174, 192, 0.5)',
              '&.Mui-checked': {
                color: '#0066FF',
              },
            }}
          />
        }
        label={
          <Typography variant="body2" sx={{ color: '#A0AEC0', userSelect: 'none' }}>
            Mantener sesión iniciada
          </Typography>
        }
        sx={{ mt: 1, mb: 2 }}
      />

      {/* Botón de Enviar */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        sx={{py: '12px'}}
      >
        Iniciar sesión
      </Button>
    </Form>
  );
};
