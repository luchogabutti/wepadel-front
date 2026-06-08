import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from '@mui/material';
import './styles.scss';


export const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  subtitle,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cerrar',
  confirmColor = 'primary',
  children,
  icon,
  center = false,
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={`confirmation-dialog-root${center ? ' confirmation-dialog--centered' : ''}`}
      slotProps={{
        paper: {
          className: 'confirmation-dialog-paper',
          sx: {
            outline: 'none',
            '&:focus': { outline: 'none', boxShadow: '0 24px 48px color-mix(in srgb, var(--mui-palette-background-default) 45%, transparent)' },
            '&:focus-visible': { outline: 'none', boxShadow: '0 24px 48px color-mix(in srgb, var(--mui-palette-background-default) 45%, transparent)' },
          },
        },
      }}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby={subtitle ? 'confirmation-dialog-description' : undefined}
    >
      {icon}

      <DialogTitle id="confirmation-dialog-title" className="confirmation-dialog-title">
        {title}
      </DialogTitle>

      {(subtitle || children) && (
        <DialogContent className="confirmation-dialog-content">
          {subtitle && (
            <Typography
              id="confirmation-dialog-description"
              variant="body2"
              className="confirmation-dialog-subtitle"
            >
              {subtitle}
            </Typography>
          )}
          {children && (
            <Box className="confirmation-dialog-custom-content">
              {children}
            </Box>
          )}
        </DialogContent>
      )}

      <DialogActions className="confirmation-dialog-actions" disableSpacing>
        <Button variant="outlined" onClick={onClose} className="confirmation-dialog-cancel">
          {cancelLabel}
        </Button>
        <Button
          variant="contained"
          color={confirmColor}
          disableElevation
          disableFocusRipple
          onClick={handleConfirm}
          className="confirmation-dialog-confirm"
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

