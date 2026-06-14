import { Typography, Button, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import './styles.scss';

export const FeaturedProducts = ({products}) => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  console.log('products en el featured products',products);

  const handleCardClick = (productId) => {
    navigate(`/producto/${productId}`);
  };

  const handleCartClick = (e, product) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <section className="featured-products">
      <div className="section-header">
        <div className="header-info">
          <Typography variant="h4" className="header-title" sx={{ fontWeight: 700 }}>
            Productos destacados
          </Typography>
          <Typography variant="body2" className="header-subtitle">
            La selección de élite para esta temporada.
          </Typography>
        </div>
        <Button
          component={Link}
          to="/catalogo"
          endIcon={<ArrowForwardIcon sx={{ fontSize: '16px' }} />}
          className="view-all-btn"
          sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
        >
          VER TODO
        </Button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleCardClick(product.id)}
          >
            <div className="product-image-container">
              <img
                src={product.img}
                alt={product.nombre}
                className="product-image"
              />
              {product.badge && (
                <span className="product-badge">
                  {product.badge}
                </span>
              )}
              <IconButton
                className="cart-button"
                onClick={(e) => handleCartClick(e, product)}
                aria-label="Agregar al carrito"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': { bgcolor: 'primary.light' },
                }}
              >
                <AddShoppingCartIcon fontSize="small" />
              </IconButton>
            </div>

            <div className="product-info">
              <Typography
                variant="caption"
                className="product-category"
              >
                {product.categoria}
              </Typography>
              <Typography
                variant="body1"
                className="product-title"
              >
                {product.nombre || product.descripcion}
              </Typography>
              <div className="product-price-container">
                <Typography variant="body1" className="product-price">
                  {typeof product.precio === 'number' ? `$${product.precio.toFixed(2)}` : product.price}
                </Typography>
                {product.oldPrice && (
                  <Typography variant="body2" className="product-old-price">
                    {typeof product.oldPrice === 'number' ? `$${product.oldPrice.toFixed(2)}` : product.oldPrice}
                  </Typography>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
