import { Typography } from '@mui/material';
import './styles.scss';

export const ProductPrice = ({ product, size = 'md' }) => {
  const original = Number(product.precio) || 0;
  const final = product.precioConDescuento ?? original;
  const hasDiscount = product.precioConDescuento != null && final < original;

  if (!hasDiscount) {
    return (
      <Typography variant={size === 'lg' ? 'h2' : 'h5'} className={`product-price product-price--${size}`}>
        ${original.toFixed(2)}
      </Typography>
    );
  }

  return (
    <div className={`product-price-block product-price-block--${size}`}>
      <Typography variant={size === 'lg' ? 'h2' : 'h5'} className={`product-price product-price--${size}`}>
        ${final.toFixed(2)}
      </Typography>
      <Typography variant={size === 'lg' ? 'body1' : 'body2'} className="product-price-old">
        ${original.toFixed(2)}
      </Typography>
      {product.descuentoPorcentaje != null && (
        <span className="product-price-badge">-{product.descuentoPorcentaje}%</span>
      )}
    </div>
  );
};
