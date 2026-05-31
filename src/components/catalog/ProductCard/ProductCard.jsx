import { Typography, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './styles.scss';

export const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <div className="imageArea">
        <img
          src={product.img}
          alt={product.title}
          className="productImg"
        />

        {product.badge && (
          <span className="badge">{product.badge}</span>
        )}

        <IconButton
          className="floatingCartBtn"
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
        <div className="titleRow">
          <Typography
            variant="body1"
            className="productTitle"
            sx={{ fontWeight: 700, fontSize: '16px' }}
          >
            {product.title}
          </Typography>
          <div className="stockInfo">
            <div
              className={`stockDot ${
                product.inStock ? 'inStock' : 'outOfStock'
              }`}
            />
            <Typography
              variant="caption"
              className={`stockLabel ${
                product.inStock ? 'inStock' : 'outOfStock'
              }`}
              sx={{ fontWeight: 600, fontSize: '11px' }}
            >
              {product.inStock ? 'Stock disponible' : 'Sin stock'}
            </Typography>
          </div>
        </div>

        <div className="priceRow">
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
              className="oldPrice"
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
