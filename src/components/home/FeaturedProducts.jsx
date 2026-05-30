import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

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

export function FeaturedProducts() {
  return (
    <Box component="section" sx={{ py: 6, px: { xs: 2, md: 4 }, backgroundColor: 'background.default' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Productos destacados
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            La selección de élite para esta temporada.
          </Typography>
        </Box>
        <Button
          endIcon={<ArrowForwardIcon sx={{ fontSize: '16px' }} />}
          sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', color: 'primary.light' }}
        >
          VER TODO
        </Button>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 2,
        }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: '1px solid rgba(160, 174, 192, 0.1)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'box-shadow 0.3s',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(0,102,255,0.15)',
                '& .product-image': { transform: 'scale(1.07)' },
                '& .cart-button': { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <Box sx={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', bgcolor: '#201f26' }}>
              <Box
                component="img"
                src={product.img}
                alt={product.title}
                className="product-image"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
              />
              {product.badge && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '11px',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                  }}
                >
                  {product.badge}
                </Box>
              )}
              <IconButton
                className="cart-button"
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  opacity: 0,
                  transform: 'translateY(12px)',
                  transition: 'all 0.3s',
                  '&:hover': { bgcolor: 'primary.light' },
                }}
              >
                <AddShoppingCartIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box sx={{ p: 2 }}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', textTransform: 'uppercase', display: 'block', mb: 0.5, letterSpacing: '0.08em' }}
              >
                {product.category}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, mb: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                {product.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {product.price}
                </Typography>
                {product.oldPrice && (
                  <Typography variant="body2" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
                    {product.oldPrice}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
