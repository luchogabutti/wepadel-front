import { Typography } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { formatCheckoutPrice } from '../../../data/cartData';
import './styles.scss';

export const CheckoutProductSummary = ({ items }) => {
  return (
    <div className="checkout-product-summary">
      <div className="summary-header">
        <ShoppingBagOutlinedIcon className="header-icon" />
        <Typography variant="h6" className="header-title">
          Resumen de productos
        </Typography>
      </div>

      <div className="items-list">
        {items.map((item) => (
          <div key={item.id} className="item-row">
            <div className="item-image-wrapper">
              <img src={item.image} alt={item.name} className="item-image" />
            </div>
            <div className="item-info">
              <Typography className="item-name">{item.name}</Typography>
              <Typography className="item-quantity">Cantidad: {item.quantity}</Typography>
              <Typography className="item-detail">{item.detail}</Typography>
            </div>
            <Typography className="item-price">
              {formatCheckoutPrice(item.unitPrice * item.quantity)}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
