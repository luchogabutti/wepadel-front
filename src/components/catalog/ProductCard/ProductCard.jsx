import { Typography, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import './styles.scss';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleCardClick = () => {
    navigate(`/producto/${product.id}`);
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="image">
        <img
          src={product.img}
          alt={product.title}
          className="img"
        />

        {product.badge && (
          <span className="badge">{product.badge}</span>
        )}

        <IconButton
          className="cart-btn"
          onClick={handleCartClick}
          disabled={!product.inStock}
          aria-label="Agregar al carrito"
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            p: 1.5,
            '&:hover': { bgcolor: 'primary.light' },
          }}
        >
          <AddShoppingCartIcon fontSize="small" />
        </IconButton>
      </div>

      <div className="content">
        <div className="title-row">
          <Typography
            variant="body1"
            className="title"
            sx={{ fontWeight: 700, fontSize: '16px' }}
          >
            {product.title}
          </Typography>
          <div className="stock-info">
            <div
              className={`stock-dot ${product.inStock ? 'in-stock' : 'out-of-stock'
                }`}
            />
            <Typography
              variant="caption"
              className={`stock-label ${product.inStock ? 'in-stock' : 'out-of-stock'
                }`}
              sx={{ fontWeight: 600, fontSize: '11px' }}
            >
              {product.inStock ? 'Stock disponible' : 'Sin stock'}
            </Typography>
          </div>
        </div>

        <div className="price-row">
          <Typography
            variant="h5"
            className="price"
            sx={{ fontWeight: 800, fontSize: '20px' }}
          >
            ${product.price.toFixed(2)}
          </Typography>
          {product.oldPrice && (
            <Typography
              variant="body2"
              className="old-price"
              sx={{ fontSize: '12px' }}
            >
              ${product.oldPrice.toFixed(2)}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
