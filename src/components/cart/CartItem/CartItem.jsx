import { Typography, Button } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { QuantityPicker } from '../QuantityPicker/QuantityPicker';
import { formatCartPrice } from '../../../data/cartData';
import './styles.scss';

export const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const lineTotal = item.unitPrice * item.quantity;

  const handleIncrease = () => onQuantityChange(item.id, item.quantity + 1);
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="cart-item">
      <div className="item-image-wrapper">
        <img src={item.image} alt={item.name} className="item-image" />
      </div>

      <div className="item-content">
        <div className="item-info">
          <Typography variant="subtitle1" className="item-name">
            {item.name}
          </Typography>
          <Typography variant="body2" className="item-description">
            {item.description}
          </Typography>
          <Typography variant="subtitle1" className="item-unit-price">
            {formatCartPrice(item.unitPrice)}
          </Typography>
        </div>

        <div className="item-actions">
          <QuantityPicker
            quantity={item.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

          <div className="item-total-section">
            <Typography variant="subtitle1" className="item-line-total">
              {formatCartPrice(lineTotal)}
            </Typography>
            <Button
              onClick={() => onRemove(item.id)}
              startIcon={<DeleteOutlinedIcon className="remove-icon" />}
              className="remove-btn"
            >
              QUITAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
