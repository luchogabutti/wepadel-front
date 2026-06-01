import { Typography, Button, TextField } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { formatShippingField, isShippingValid } from '../../../utils/checkoutValidation';
import './styles.scss';

export const CheckoutShippingCard = ({
  shippingData,
  isCompleted,
  onFieldChange,
  onSubmit,
  onEdit,
}) => {
  const formattedAddress = `${shippingData.address}, ${shippingData.city}`;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!isShippingValid(shippingData)) return;

    onSubmit();
  };

  const handleChange = (field) => (e) => {
    onFieldChange(field, formatShippingField(field, e.target.value));
  };

  if (isCompleted) {
    return (
      <div className="checkout-shipping-card">
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
    <div className="checkout-shipping-card">
      <div className="card-header">
        <LocalShippingOutlinedIcon className="header-icon" />
        <Typography variant="h6" className="header-title">
          Envío a Domicilio
        </Typography>
      </div>

      <form onSubmit={handleFormSubmit} className="form-fields">
        <TextField
          fullWidth
          required
          label="Dirección"
          placeholder="Av. Libertador 1234"
          value={shippingData.address}
          onChange={handleChange('address')}
        />
        <div className="form-row">
          <TextField
            fullWidth
            required
            label="Ciudad"
            placeholder="CABA"
            value={shippingData.city}
            onChange={handleChange('city')}
          />
          <TextField
            fullWidth
            required
            label="Código postal"
            placeholder="1425"
            value={shippingData.postalCode}
            onChange={handleChange('postalCode')}
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]{4,8}',
              maxLength: 8,
              title: 'Ingresá entre 4 y 8 números',
            }}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          className="submit-btn"
          sx={{ bgcolor: 'primary.main', color: '#f8f7ff', '&:hover': { bgcolor: 'primary.main' } }}
        >
          Confirmar envío
        </Button>
      </form>
    </div>
  );
};
