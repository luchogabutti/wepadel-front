import { Typography, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ContactlessOutlinedIcon from '@mui/icons-material/ContactlessOutlined';
import { formatCheckoutPrice } from '../../../data/cartData';
import './styles.scss';

export const CheckoutPaymentDetail = ({
  subtotal,
  pointsDiscount,
  total,
  canConfirm,
  onConfirm,
}) => {
  return (
    <div className="surface-card surface-card--dark checkout-payment-detail">
      <Typography variant="h6" className="detail-title">
        Detalle del Pago
      </Typography>

      <div className="detail-rows">
        <div className="detail-row">
          <Typography className="detail-label">Subtotal</Typography>
          <Typography className="detail-value">{formatCheckoutPrice(subtotal)}</Typography>
        </div>
        <div className="detail-row">
          <Typography className="detail-label">Envío</Typography>
          <Typography className="detail-highlight">Gratis</Typography>
        </div>
        {pointsDiscount > 0 && (
          <div className="detail-row">
            <Typography className="detail-label">Descuento por puntos</Typography>
            <Typography className="detail-highlight">-{formatCheckoutPrice(pointsDiscount)}</Typography>
          </div>
        )}
        <div className="detail-total-row">
          <Typography variant="subtitle1" className="detail-total-label">
            Total Final
          </Typography>
          <Typography variant="h5" className="detail-total-value">
            {formatCheckoutPrice(total)}
          </Typography>
        </div>
      </div>

      <Button
        fullWidth
        variant="contained"
        startIcon={<LockOutlinedIcon />}
        onClick={onConfirm}
        disabled={!canConfirm}
        className="confirm-btn"
      >
        Confirmar compra
      </Button>

      {!canConfirm && (
        <Typography className="validation-hint">
          Completá el envío y los datos de pago para continuar.
        </Typography>
      )}

      <div className="secure-notice">
        <LockOutlinedIcon className="secure-icon" />
        <Typography className="secure-text">Pago procesado de forma segura</Typography>
      </div>

      <div className="payment-icons">
        <CreditCardOutlinedIcon className="payment-icon" />
        <AccountBalanceWalletOutlinedIcon className="payment-icon" />
        <ContactlessOutlinedIcon className="payment-icon" />
      </div>
    </div>
  );
};
