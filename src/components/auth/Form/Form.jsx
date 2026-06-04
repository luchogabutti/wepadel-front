import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import './styles.scss';

export const Form = ({
  title,
  subtitle,
  onSubmit,
  footerText,
  footerActionText,
  footerActionTo,
  maxWidth = '420px',
  children,
}) => {
  return (
    <Box className="generic-form-container" sx={{ maxWidth }}>
      <Box className="ambient-light-top" />
      <Box className="ambient-light-bottom" />

      <Box className="surface-card form-card">
        <Box className="card-header">
          {title && (
            <Typography variant="h4" className="card-title">
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body2" className="card-subtitle">
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box component="form" noValidate onSubmit={onSubmit} className="form-content">
          {children}
        </Box>

        {footerText && footerActionText && footerActionTo && (
          <Box className="card-footer">
            <Typography variant="body2" className="footer-text">
              {footerText}
              <Link
                component={RouterLink}
                to={footerActionTo}
                className="footer-action-link"
              >
                {footerActionText}
              </Link>
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
