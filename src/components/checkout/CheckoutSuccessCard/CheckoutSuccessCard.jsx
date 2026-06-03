import { Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import './styles.scss';

export const CheckoutSuccessCard = ({ orderId, pointsEarned, productImages, extraItemsCount }) => {
  return (
    <div className="checkout-success-card">
      <div className="success-icon-wrapper">
        <CheckCircleOutlinedIcon className="success-icon" />
      </div>

      <Typography variant="h4" className="success-title">
        ¡Compra confirmada!
      </Typography>
      <Typography className="success-description">
        Tu pedido ha sido procesado con éxito y pronto estará en camino.
      </Typography>

      <div className="info-grid">
        <div className="info-box">
          <Typography className="info-label">NÚMERO DE ORDEN</Typography>
          <Typography className="info-value">#{orderId}</Typography>
        </div>
        <div className="info-box points-box">
          <div className="points-label-row">
            <StarOutlinedIcon className="points-label-icon" />
            <Typography className="points-label">BENEFICIO EXCLUSIVE</Typography>
          </div>
          <Typography className="points-value">Ganaste {pointsEarned} puntos</Typography>
        </div>
      </div>

      <div className="product-preview">
        {productImages.map((img, index) => (
          <div key={index} className="product-thumb">
            <img src={img} alt="" className="product-thumb-image" />
          </div>
        ))}
        {extraItemsCount > 0 && (
          <div className="extra-items">
            <Typography className="extra-items-text">+ {extraItemsCount} items</Typography>
          </div>
        )}
      </div>

      <div className="actions-row">
        <Button component={RouterLink} to="/perfil/ordenes" variant="outlined" className="orders-btn">
          Ver mis órdenes
        </Button>
        <Button
          component={RouterLink}
          to="/perfil/ordenes"
          variant="contained"
          className="continue-btn"
          sx={{ bgcolor: 'primary.light', color: 'primary.dark', '&:hover': { bgcolor: 'primary.light' } }}
        >
          Seguir comprando
        </Button>
      </div>

      <Typography className="support-text">
        ¿Tienes alguna duda? <span className="support-link">Contacta a soporte élite</span>
      </Typography>
    </div>
  );
};
