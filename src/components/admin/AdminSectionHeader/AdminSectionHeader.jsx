import { Box, Typography } from '@mui/material';
import '../styles.scss';

export const AdminSectionHeader = ({
  eyebrow,
  title,
  description,
  variant = 'compact',
  alignActions = 'start',
  actions,
}) => {
  const titleClassName =
    variant === 'hero'
      ? 'admin-section-title admin-section-title--hero'
      : 'admin-section-title';

  const rowClassName = [
    'admin-section-header-row',
    alignActions === 'center' ? 'admin-section-header-row--align-center' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={rowClassName}>
      <Box className="admin-section-header-copy">
        {eyebrow && <Typography component="span" className="admin-section-eyebrow">{eyebrow}</Typography>}
        <Typography component="h1" className={titleClassName}>
          {title}
        </Typography>
        {description && (
          <Typography component="p" className="admin-section-description">
            {description}
          </Typography>
        )}
      </Box>
      {actions && <Box className="admin-section-actions">{actions}</Box>}
    </header>
  );
};
