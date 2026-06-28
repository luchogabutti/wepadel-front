import { Typography, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { ProductPrice } from '../ProductPrice/ProductPrice';
import { PLACEHOLDER_IMG } from '../../../services/productMapper';
import './styles.scss';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const inStock = Number(product.stock) > 0;

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
          src={product.imagen || PLACEHOLDER_IMG}
          alt={product.nombre}
          className="img"
        />

        <IconButton
          className="cart-btn"
          onClick={handleCartClick}
          disabled={!inStock}
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
            {product.nombre}
          </Typography>
          <div className="stock-info">
            <div
              className={`stock-dot ${inStock ? 'in-stock' : 'out-of-stock'}`}
            />
            <Typography
              variant="caption"
              className={`stock-label ${inStock ? 'in-stock' : 'out-of-stock'}`}
              sx={{ fontWeight: 600, fontSize: '11px' }}
            >
              {inStock ? 'Stock disponible' : 'Sin stock'}
            </Typography>
          </div>
        </div>

        <div className="price-row">
          <ProductPrice product={product} />
        </div>
      </div>
    </div>
  );
};
