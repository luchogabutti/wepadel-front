import { Typography, Button, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';
import { featuredProducts } from '../../../data/productsData';
import './styles.scss';

export const FeaturedProducts = () => {
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
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
          >
            <div className="product-image-container">
              <img
                src={product.img}
                alt={product.title}
                className="product-image"
              />
              {product.badge && (
                <span className="product-badge">
                  {product.badge}
                </span>
              )}
              <IconButton
                className="cart-button"
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
                {product.category}
              </Typography>
              <Typography
                variant="body1"
                className="product-title"
              >
                {product.title}
              </Typography>
              <div className="product-price-container">
                <Typography variant="body1" className="product-price">
                  {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}
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

