import { Typography, Button, TextField } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import './styles.scss';

export const CheckoutShippingCard = ({
  shippingData,
  isCompleted,
  onFieldChange,
  onSubmit,
  onEdit,
}) => {
  const formattedAddress = `${shippingData.address}, ${shippingData.city}`;

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

      <div className="form-fields">
        <TextField
          fullWidth
          label="Dirección"
          placeholder="Av. Libertador 1234"
          value={shippingData.address}
          onChange={(e) => onFieldChange('address', e.target.value)}
        />
        <div className="form-row">
          <TextField
            fullWidth
            label="Ciudad"
            placeholder="CABA"
            value={shippingData.city}
            onChange={(e) => onFieldChange('city', e.target.value)}
          />
          <TextField
            fullWidth
            label="Código postal"
            placeholder="1425"
            value={shippingData.postalCode}
            onChange={(e) => onFieldChange('postalCode', e.target.value)}
          />
        </div>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={!shippingData.address.trim() || !shippingData.city.trim()}
          className="submit-btn"
          sx={{ bgcolor: 'primary.main', color: '#f8f7ff', '&:hover': { bgcolor: 'primary.main' } }}
        >
          Confirmar envío
        </Button>
      </div>
    </div>
  );
};
