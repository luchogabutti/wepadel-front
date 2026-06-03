import { Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { formatCartPrice } from '../../../data/cartData';
import './styles.scss';

export const CartSummary = ({ subtotal, total }) => {
  return (
    <div className="surface-card surface-card--dark cart-summary">
      <Typography variant="h6" className="summary-title">
        Resumen de compra
      </Typography>

      <div className="summary-rows">
        <div className="summary-row">
          <Typography className="summary-label">Subtotal</Typography>
          <Typography className="summary-value">{formatCartPrice(subtotal)}</Typography>
        </div>
        <div className="summary-row">
          <Typography className="summary-label">Envío</Typography>
          <Typography className="summary-shipping">Gratis</Typography>
        </div>
        <div className="summary-total-row">
          <Typography variant="subtitle1" className="summary-total-label">
            Total
          </Typography>
          <Typography variant="h6" className="summary-total-value">
            {formatCartPrice(total)}
          </Typography>
        </div>
      </div>

      <Button
        component={RouterLink}
        to="/checkout"
        fullWidth
        variant="contained"
        className="checkout-btn"
      >
        Ir al Checkout
      </Button>

      <div className="trust-badges">
        <div className="trust-badge">
          <VerifiedUserOutlinedIcon className="trust-icon" />
          <Typography className="trust-text">Pago seguro garantizado</Typography>
        </div>
        <div className="trust-badge">
          <LocalShippingOutlinedIcon className="trust-icon" />
          <Typography className="trust-text">Entrega en 24/48 horas</Typography>
        </div>
      </div>
    </div>
  );
};
