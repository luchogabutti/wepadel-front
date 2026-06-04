import { Box } from '@mui/material';
import '../styles.scss';

export const AdminTableCard = ({ children, footer }) => (
  <Box className="admin-products-table-card">
    {children}
    {footer}
  </Box>
);
