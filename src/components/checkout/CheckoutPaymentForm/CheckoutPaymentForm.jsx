import { Typography, TextField } from '@mui/material';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { formatPaymentField, getPaymentFieldError } from '../../../utils/checkoutValidation';
import './styles.scss';

export const CheckoutPaymentForm = ({ formData, onFieldChange, showValidation }) => {
  const handleChange = (field) => (e) => {
    onFieldChange(field, formatPaymentField(field, e.target.value));
  };

  const fieldProps = (field) => {
    const errorMessage = getPaymentFieldError(field, formData, showValidation);
    return {
      error: Boolean(errorMessage),
      helperText: errorMessage,
    };
  };

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
          required
          label="Nombre en la Tarjeta"
          placeholder="Como figura en la tarjeta"
          value={formData.cardName}
          onChange={handleChange('cardName')}
          {...fieldProps('cardName')}
        />
        <TextField
          fullWidth
          required
          label="Número de Tarjeta"
          placeholder="0000 0000 0000 0000"
          value={formData.cardNumber}
          onChange={handleChange('cardNumber')}
          slotProps={{
            htmlInput: {
              inputMode: 'numeric',
              maxLength: 19,
            },
            input: {
              endAdornment: <CreditCardOutlinedIcon className="card-icon" />,
            },
          }}
          {...fieldProps('cardNumber')}
        />
        <div className="form-row">
          <TextField
            fullWidth
            required
            label="Vencimiento"
            placeholder="MM/AA"
            value={formData.expiry}
            onChange={handleChange('expiry')}
            slotProps={{
              htmlInput: {
                inputMode: 'numeric',
                maxLength: 5,
              },
            }}
            {...fieldProps('expiry')}
          />
          <TextField
            fullWidth
            required
            label="CVC"
            placeholder="123"
            value={formData.cvc}
            onChange={handleChange('cvc')}
            slotProps={{
              htmlInput: {
                inputMode: 'numeric',
                maxLength: 4,
              },
            }}
            {...fieldProps('cvc')}
          />
        </div>
      </div>
    </div>
  );
};
