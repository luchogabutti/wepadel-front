import { Typography, Button } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { QuantityPicker } from '../QuantityPicker/QuantityPicker';
import { formatCartPrice } from '../../../data/cartData';
import './styles.scss';
import { ConfirmationDialog } from '../../general/ConfirmationDialog/ConfirmationDialog';
import { useState } from 'react';

export const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const lineTotal = item.unitPrice * item.quantity;

  const handleIncrease = () => onQuantityChange(item.id, item.quantity + 1);
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    setOpen(true);
    setId(item.id);
  };

  const handleClose = () => {
    setOpen(false);
    setId(null);
  };

  const handleConfirm = () => {
    onRemove(id);
    setId(null);
    handleClose();
  };

  return (
    <div className="surface-card surface-card--compact cart-item">
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
              onClick={() => handleRemove(item.id)}
              startIcon={<DeleteOutlinedIcon className="remove-icon" />}
              className="remove-btn"
            >
              QUITAR
            </Button>
          </div>
        </div>
      </div>
      <ConfirmationDialog
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="¿Estás seguro que quieres quitar este producto del carrito?"
        subtitle="Esta acción no se puede deshacer."
        confirmColor="error"
      />
    </div>
  );
};
