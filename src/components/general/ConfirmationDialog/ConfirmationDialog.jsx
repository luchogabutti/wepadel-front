import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
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
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="confirmation-dialog-root"
      PaperProps={{ className: 'confirmation-dialog-paper' }}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby={subtitle ? 'confirmation-dialog-description' : undefined}
    >
      <DialogTitle id="confirmation-dialog-title" className="confirmation-dialog-title">
        {title}
      </DialogTitle>

      {subtitle && (
        <DialogContent className="confirmation-dialog-content">
          <Typography
            id="confirmation-dialog-description"
            variant="body2"
            className="confirmation-dialog-subtitle"
          >
            {subtitle}
          </Typography>
        </DialogContent>
      )}

      <DialogActions className="confirmation-dialog-actions" disableSpacing>
        <Button variant="outlined" onClick={onClose} className="confirmation-dialog-cancel">
          {cancelLabel}
        </Button>
        <Button
          variant="contained"
          color={confirmColor}
          onClick={handleConfirm}
          className="confirmation-dialog-confirm"
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
