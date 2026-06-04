import { Snackbar, Alert } from '@mui/material';

export const PageSnackbar = ({ snackbar, onClose }) => (
  <Snackbar
    key={snackbar.key}
    open={snackbar.open}
    autoHideDuration={2000}
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  >
    <Alert
      onClose={onClose}
      severity={snackbar.severity || 'success'}
      variant="filled"
      className="admin-snackbar-alert"
    >
      {snackbar.message}
    </Alert>
  </Snackbar>
);
