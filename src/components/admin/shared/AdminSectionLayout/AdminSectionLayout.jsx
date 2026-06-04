import { Box } from '@mui/material';
import { PageHeader } from '../../../layout/PageHeader';
import '../styles.scss';

export const AdminSectionLayout = ({
  title,
  subtitle,
  actions,
  className = '',
  children,
}) => (
  <Box className={`admin-section-layout ${className}`.trim()}>
    {title && (
      <PageHeader
        variant="profile"
        title={title}
        subtitle={subtitle}
        alignActions="center"
        actions={actions}
      />
    )}
    {children}
  </Box>
);
