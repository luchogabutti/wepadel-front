import { Typography, TextField } from '@mui/material';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { formatPaymentField } from '../../../utils/checkoutValidation';
import './styles.scss';

export const CheckoutPaymentForm = ({ formData, onFieldChange }) => {
  const handleChange = (field) => (e) => {
    onFieldChange(field, formatPaymentField(field, e.target.value));
  };

  return (
    <div className="checkout-payment-form">
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
          required
          label="Nombre en la Tarjeta"
          placeholder="Como figura en la tarjeta"
          value={formData.cardName}
          onChange={handleChange('cardName')}
        />
        <TextField
          fullWidth
          required
          label="Número de Tarjeta"
          placeholder="0000 0000 0000 0000"
          value={formData.cardNumber}
          onChange={handleChange('cardNumber')}
          inputProps={{
            inputMode: 'numeric',
            maxLength: 19,
          }}
          slotProps={{
            input: {
              endAdornment: <CreditCardOutlinedIcon className="card-icon" />,
            },
          }}
        />
        <div className="form-row">
          <TextField
            fullWidth
            required
            label="Vencimiento"
            placeholder="MM/AA"
            value={formData.expiry}
            onChange={handleChange('expiry')}
            inputProps={{
              inputMode: 'numeric',
              maxLength: 5,
            }}
          />
          <TextField
            fullWidth
            required
            label="CVC"
            placeholder="123"
            value={formData.cvc}
            onChange={handleChange('cvc')}
            inputProps={{
              inputMode: 'numeric',
              maxLength: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
};
