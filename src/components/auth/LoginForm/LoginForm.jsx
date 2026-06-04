import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  InputAdornment,
} from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Form } from '../Form/Form';
import { isLoginFormValid } from '../../../utils/authValidation';
import './styles.scss';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const canSubmit = isLoginFormValid({ email, password });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    navigate('/');
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AlternateEmailIcon className="field-icon" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box className="form-field">
        <Box className="password-label-row">
          <Typography variant="caption" className="field-label">
            Contraseña
          </Typography>
          <Link component={RouterLink} to="#" className="forgot-password-link">
            ¿Olvidaste tu contraseña?
          </Link>
        </Box>
        <TextField
          fullWidth
          required
          variant="outlined"
          placeholder="••••••••"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LockIcon className="field-icon" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            sx={{
              color: 'text.secondary',
              opacity: 0.5,
              '&.Mui-checked': {
                color: 'primary.main',
              },
            }}
          />
        }
        label={
          <Typography variant="body2" sx={{ color: 'text.secondary', userSelect: 'none' }}>
            Mantener sesión iniciada
          </Typography>
        }
        sx={{ mt: 1, mb: 2 }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={!canSubmit}
        endIcon={<ArrowForwardIcon />}
        sx={{ py: '12px' }}
      >
        Iniciar sesión
      </Button>
    </Form>
  );
};
