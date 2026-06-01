import { Typography, Button, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';
import './styles.scss';

const products = [
  {
    id: 1,
    title: 'Carbon Pro X-1',
    category: 'Paleta de Ataque',
    price: '$249.00',
    oldPrice: '$299.00',
    badge: 'NUEVO',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxb-qv5aqNPTakjDMkRoX39ClTF7g5qvUObOsDg22zGVIFDj3uJYJjrsLwmlKyI_C5wG5P7XRqotr0ULNHvnYw6VuB8tjy0p6m-h4e-CfbDBf4hDCWVrdh1pZ3YoKkb84V0wnWYZT_OlIzk1KQPLy5axczvEYZXyxY385I8CY_gwHFqRYOu7hMpiToLqUkb2YYaSAwcr2oIUSGn_nsVD8xmx_HoChApfIjilZM-mLJ4kxeV8M1Qixfb3gxKBGBUcPbHxmWM_FMVSPu',
  },
  {
    id: 2,
    title: 'Master Tour Pack x3',
    category: 'Pelotas',
    price: '$15.00',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwhFL8X7mj_JWYy12l9tfBKQzs5PLliUkicLnkHqNf5_3skuYd9TXlqI9spd7vjxhPthvOnxwDawbGR3vL0iEb6_vbhdX9XiUZVfLm0llgi6Kjd8jElAbtannG6R9PJBsTGtkj8lgZEFYAhQ7HQTkOfXPybdKW_A5c1dNmQPFXLSn5-9UkLyGPussTcwj_cCcBvkIxexi-eJhe4s7Fw4MHZvIvHMxESdbF8fiVK4N0wSep5FdsJiIRs5ypytjO7Gq8c5WE48Wnz-ep',
  },
  {
    id: 3,
    title: 'Control Elite S2',
    category: 'Paleta de Control',
    price: '$210.00',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDROQTYPdJI7Sa0I4qty5jQTU0WLpfZXAP9baFOmIauWqmJBMIsV8v96DK4eNfQHT9fH8ovmNiwiel9xBwyraZvuX2laFU1daItJeCJvXczFE8V2ybRNSXz9aLjujgS23li4FOAA9pPAYwXVOksM6GklRaHIR1AB0gRVjeHKOJy4WBx7CaVKVQMEkiV05sDbQxdXqtWxBQ9wllc0UYhKNttA6lm9ej2_gXN92an1HuGvwmuRp5KlYTRWMuhsLi5Qo-HJda5drliwZ_m',
  },
  {
    id: 4,
    title: 'Overgrip Ultra-Tack',
    category: 'Accesorios',
    price: '$12.00',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXypnPtcErqB05TGTM9EDj44pvzdZIVDxMb7cRHE1KrMP_2RYjxi0wpswxwLVJyskgXZEwb6PnDE9_LvU5WkOwE7-X7mdvVy65P0s8lPzqR5yYY57OLolpY3aY-nGv_ltKKEM6tqQXWHou06Asmk0bb9CJ8VPzcCwKOxzDY8l4HS5oYojeAof4X3cS483V4XSvedheq2_4T5CIl6-5o38ysdzd4SvmZ7GvnDJE4LT3yc6xI9mGx1vLctWYWk3M51hh6yV_IKSu',
  },
];

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
        {products.map((product) => (
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
                  {product.price}
                </Typography>
                {product.oldPrice && (
                  <Typography variant="body2" className="product-old-price">
                    {product.oldPrice}
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
