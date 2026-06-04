import { useState } from 'react';
import { Typography, Button, TextField } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import {
  formatShippingField,
  isShippingValid,
  getShippingFieldError,
} from '../../../utils/checkoutValidation';
import './styles.scss';

export const CheckoutShippingCard = ({
  shippingData,
  isCompleted,
  onFieldChange,
  onSubmit,
  onEdit,
}) => {
  const [showErrors, setShowErrors] = useState(false);
  const formattedAddress = `${shippingData.address}, ${shippingData.city}`;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!isShippingValid(shippingData)) {
      setShowErrors(true);
      return;
    }

    setShowErrors(false);
    onSubmit();
  };

  const handleChange = (field) => (e) => {
    onFieldChange(field, formatShippingField(field, e.target.value));
  };

  const fieldProps = (field) => {
    const errorMessage = getShippingFieldError(field, shippingData, showErrors);
    return {
      error: Boolean(errorMessage),
      helperText: errorMessage,
    };
  };

  if (isCompleted) {
    return (
      <div className="surface-card checkout-shipping-card">
        <div className="completed-row">
          <div className="completed-info">
            <div className="icon-wrapper">
              <LocalShippingOutlinedIcon className="shipping-icon" />
            </div>
            <div>
              <Typography className="shipping-title">Envío a Domicilio</Typography>
              <Typography className="shipping-address">{formattedAddress}</Typography>
            </div>
          </div>
          <Button onClick={onEdit} className="edit-btn">
            Cambiar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="surface-card checkout-shipping-card">
      <div className="card-header">
        <LocalShippingOutlinedIcon className="header-icon" />
        <Typography variant="h6" className="header-title">
          Envío a Domicilio
        </Typography>
      </div>

      <form noValidate onSubmit={handleFormSubmit} className="form-fields">
        <TextField
          fullWidth
          required
          label="Dirección"
          placeholder="Av. Libertador 1234"
          value={shippingData.address}
          onChange={handleChange('address')}
          {...fieldProps('address')}
        />
        <div className="form-row">
          <TextField
            fullWidth
            required
            label="Ciudad"
            placeholder="CABA"
            value={shippingData.city}
            onChange={handleChange('city')}
            {...fieldProps('city')}
          />
          <TextField
            fullWidth
            required
            label="Código postal"
            placeholder="1425"
            value={shippingData.postalCode}
            onChange={handleChange('postalCode')}
            slotProps={{
              htmlInput: {
                inputMode: 'numeric',
                maxLength: 8,
              },
            }}
            {...fieldProps('postalCode')}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          className="submit-btn"
        >
          Confirmar envío
        </Button>
      </form>
    </div>
  );
};
