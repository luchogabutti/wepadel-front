import { useState } from 'react';
import { Typography, Button, IconButton, Rating, Breadcrumbs, Link as MuiLink } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import './styles.scss';

export const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addItem } = useCart();

  const nombre = product.nombre;
  const categoriaSlug = product.categoria?.toLowerCase() || '';
  const imagen = product.imagen || 'https://placehold.co/400x400?text=WePadel';
  const imagenes = product.imagenes?.length ? product.imagenes : [imagen];
  const inStock = (product.stock ?? 1) > 0;

  const descripcionParrafos = (product.descripcion || '')
    .split(/\n+/)
    .map((parrafo) => parrafo.trim())
    .filter(Boolean);

  const [selectedImg, setSelectedImg] = useState(null);
  const displayImg = selectedImg || imagenes[0];

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="product-detail-container">
      <div className="detail-navigation">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          className="back-btn"
          sx={{ textTransform: 'none', fontWeight: 600, color: 'text.secondary' }}
        >
          Volver
        </Button>
        <Breadcrumbs aria-label="breadcrumb" className="detail-breadcrumbs">
          <MuiLink component={RouterLink} to="/" color="inherit" underline="hover">
            Inicio
          </MuiLink>
          <MuiLink
            component={RouterLink}
            to={`/catalogo/${categoriaSlug}`}
            color="inherit"
            underline="hover"
          >
            {product.categoria || 'Catálogo'}
          </MuiLink>
          <Typography color="text.primary">{nombre}</Typography>
        </Breadcrumbs>
      </div>

      <div className="detail-layout">
        <div className="detail-gallery">
          <div className="main-image-wrapper">
            <img src={displayImg} alt={nombre} className="main-image" />
            {product.badge && ( // TODO: agregar data en backend/revisar — campo `badge`
              <span className="detail-badge">{product.badge}</span>
            )}
          </div>
          {imagenes.length > 1 && (
            <div className="thumbnail-list">
              {imagenes.map((image, index) => (
                <button
                  key={`${product.id}-${index}`}
                  type="button"
                  className={`thumb-btn ${selectedImg === image ? 'active' : ''}`}
                  onClick={() => setSelectedImg(image)}
                  aria-label={`Ver imagen ${index + 1}`}
                >
                  <img src={image} alt={`${nombre} vista ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          <span className="product-category-label">
            {product.categoria || 'WEPADEL ELITE'}
          </span>

          <Typography variant="h1" className="product-title">
            {nombre}
          </Typography>

          <div className="rating-row">
            <Rating name="read-only" value={4.8} precision={0.1} readOnly size="small" />
            <Typography variant="body2" className="rating-count">
              4.8 (42 valoraciones de clientes)
            </Typography>
          </div>

          <div className="price-row">
            <Typography variant="h2" className="current-price">
              ${product.precio.toFixed(2)}
            </Typography>
            {product.precioAnterior && ( // TODO: agregar data en backend/revisar — campo `precioAnterior`
              <Typography variant="body1" className="old-price">
                ${product.precioAnterior.toFixed(2)}
              </Typography>
            )}
          </div>

          <div className="stock-row">
            <span className={`stock-badge ${inStock ? 'in-stock' : 'out-of-stock'}`}>
              {inStock ? 'Stock disponible' : 'Sin stock'}
            </span>
          </div>

          <div className="specs-section">
            <Typography variant="h6" className="specs-title">
              Descripción
            </Typography>
            <div className="product-description-block">
              {descripcionParrafos.length > 0 ? (
                descripcionParrafos.map((parrafo, i) => (
                  <Typography key={i} variant="body1" className="product-description">
                    {parrafo}
                  </Typography>
                ))
              ) : (
                <Typography variant="body1" className="product-description">
                  Este producto todavía no tiene una descripción detallada.
                </Typography>
              )}
            </div>
          </div>

          <div className="purchase-actions">
            <div className="quantity-selector">
              <IconButton onClick={handleDecrease} className="qty-btn" disabled={!inStock}>
                <RemoveIcon fontSize="small" />
              </IconButton>
              <span className="qty-value">{quantity}</span>
              <IconButton onClick={handleIncrease} className="qty-btn" disabled={!inStock}>
                <AddIcon fontSize="small" />
              </IconButton>
            </div>

            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddShoppingCartIcon />}
              className="add-to-cart-btn"
              disabled={!inStock}
              onClick={handleAddToCart}
              sx={{ fontWeight: 'bold', textTransform: 'none' }}
            >
              Agregar al carrito
            </Button>
          </div>

          <div className="highlights-section">
            <div className="highlight-item">
              <LocalShippingIcon className="highlight-icon" />
              <div className="highlight-text">
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Envío gratis a todo el país</Typography>
                <Typography variant="caption" color="text.secondary">Recíbelo en 48hs en tu domicilio</Typography>
              </div>
            </div>
            <div className="highlight-item">
              <CreditCardIcon className="highlight-icon" />
              <div className="highlight-text">
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Hasta 12 cuotas sin interés</Typography>
                <Typography variant="caption" color="text.secondary">Aceptamos todas las tarjetas de crédito</Typography>
              </div>
            </div>
            <div className="highlight-item">
              <VerifiedUserIcon className="highlight-icon" />
              <div className="highlight-text">
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Garantía Oficial WePadel</Typography>
                <Typography variant="caption" color="text.secondary">Compra 100% segura directa de fábrica</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
