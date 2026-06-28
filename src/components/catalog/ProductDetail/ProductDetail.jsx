import { useState } from 'react';
import { Typography, Button, IconButton, Breadcrumbs, Link as MuiLink } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { ProductPrice } from '../ProductPrice/ProductPrice';
import { PLACEHOLDER_IMG } from '../../../services/productMapper';
import './styles.scss';

export const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { addItem } = useCart();

  const nombre = product.nombre;
  const categoriaSlug = product.categoria?.toLowerCase() || '';
  const imagen = product.imagen || PLACEHOLDER_IMG;
  const imagenes = product.imagenes?.length ? product.imagenes : [imagen];
  const inStock = Number(product.stock) > 0;

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
    const maxStock = Number(product.stock);
    if (Number.isFinite(maxStock) && maxStock > 0 && quantity >= maxStock) return;
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

          <div className="price-row">
            <ProductPrice product={product} size="lg" />
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
            {isAdmin ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<DashboardOutlinedIcon />}
                className="add-to-cart-btn"
                onClick={() => navigate('/admin/catalogo')}
                sx={{ fontWeight: 'bold', textTransform: 'none' }}
              >
                Administrar desde el panel
              </Button>
            ) : (
              <>
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
              </>
            )}
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
