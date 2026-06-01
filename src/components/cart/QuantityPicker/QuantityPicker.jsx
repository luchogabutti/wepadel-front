import { IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import './styles.scss';

export const QuantityPicker = ({ quantity, onIncrease, onDecrease, min = 1 }) => {
  return (
    <div className="quantity-picker">
      <IconButton
        size="small"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label="Disminuir cantidad"
        className="control-btn"
      >
        <RemoveIcon className="control-icon" />
      </IconButton>
      <Typography component="span" className="quantity-value">
        {quantity}
      </Typography>
      <IconButton
        size="small"
        onClick={onIncrease}
        aria-label="Aumentar cantidad"
        className="control-btn"
      >
        <AddIcon className="control-icon" />
      </IconButton>
    </div>
  );
};
