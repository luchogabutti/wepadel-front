import { Typography, TextField } from '@mui/material';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import './styles.scss';

export const CheckoutPaymentForm = ({ formData, onFieldChange }) => {
  return (
    <div className="surface-card checkout-payment-form">
      <div className="form-header">
        <CreditCardOutlinedIcon className="header-icon" />
        <Typography variant="h6" className="header-title">
          Método de Pago
        </Typography>
      </div>

      <div className="secure-banner">
        <CheckCircleOutlinedIcon className="secure-icon" />
        <Typography className="secure-text">
          Transacción Segura con Tarjeta de Crédito
        </Typography>
      </div>

      <div className="form-fields">
        <TextField
          fullWidth
          label="Nombre en la Tarjeta"
          placeholder="Como figura en la tarjeta"
          value={formData.cardName}
          onChange={(e) => onFieldChange('cardName', e.target.value)}
        />
        <TextField
          fullWidth
          label="Número de Tarjeta"
          placeholder="0000 0000 0000 0000"
          value={formData.cardNumber}
          onChange={(e) => onFieldChange('cardNumber', e.target.value)}
          slotProps={{
            input: {
              endAdornment: <CreditCardOutlinedIcon className="card-icon" />,
            },
          }}
        />
        <div className="form-row">
          <TextField
            fullWidth
            label="Vencimiento"
            placeholder="MM/AA"
            value={formData.expiry}
            onChange={(e) => onFieldChange('expiry', e.target.value)}
          />
          <TextField
            fullWidth
            label="CVC"
            placeholder="123"
            value={formData.cvc}
            onChange={(e) => onFieldChange('cvc', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
