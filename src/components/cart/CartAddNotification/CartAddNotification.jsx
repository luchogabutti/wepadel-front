import { Snackbar } from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useCart } from '../../../context/CartContext';
import './styles.scss';

export const CartAddNotification = () => {
  const { notification, closeNotification } = useCart();

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') return;
    closeNotification();
  };

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      className="cart-add-notification"
    >
      <div className="notification-content" role="alert">
        <CheckCircleOutlinedIcon className="notification-icon" />
        <span className="notification-text">{notification.message}</span>
      </div>
    </Snackbar>
  );
};
