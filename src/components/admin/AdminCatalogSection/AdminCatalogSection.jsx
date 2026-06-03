import {
  Box,
  Typography,
  Button,
  IconButton,
  Switch,
} from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import './styles.scss'

export const AdminCatalogSection = ({
  searchTerm = '',
  products = [],
  onRequestEdit,
  onRequestDelete,
  onToggleEnabled,
}) => {
  const normalizedSearch = searchTerm.toLowerCase().trim()

  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(normalizedSearch) ||
      product.sku.toLowerCase().includes(normalizedSearch) ||
      product.categoryId.toLowerCase().includes(normalizedSearch)
    )
  })

  const totalProducts = products.length
  const lowStockProducts = products.filter((product) => product.stock <= 10).length
  const activeProducts = products.filter((product) => product.enabled).length
  const categoriesCount = new Set(products.map((product) => product.category)).size

  const catalogStats = [
    {
      id: 'total-products',
      label: 'TOTAL PRODUCTOS',
      value: totalProducts,
      variant: 'default',
    },
    {
      id: 'low-stock-products',
      label: 'STOCK BAJO',
      value: lowStockProducts,
      variant: 'danger',
    },
    {
      id: 'active-products',
      label: 'ACTIVOS',
      value: activeProducts,
      variant: 'success',
    },
    {
      id: 'categories',
      label: 'CATEGORÍAS',
      value: categoriesCount,
      variant: 'default',
    },
  ]

  const showingText =
    filteredProducts.length > 0
      ? `Mostrando 1-${filteredProducts.length} de ${products.length} productos`
      : `Mostrando 0 de ${products.length} productos`

  return (
    <Box className="admin-catalog-section">
      <Box className="admin-stats-grid">
        {catalogStats.map((stat) => (
          <Box key={stat.id} className="admin-stat-card">
            <Typography className="admin-stat-label">{stat.label}</Typography>
            <Typography variant="h4" component="strong" className={`admin-stat-value ${stat.variant}`}>
              {stat.value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box className="admin-products-table-card">
        <table className="admin-products-table">
          <thead>
            <tr>
              <th>IMAGEN</th>
              <th>NOMBRE</th>
              <th>CATEGORÍA</th>
              <th>PRECIO</th>
              <th>STOCK</th>
              <th style={{ textAlign: 'center' }}>HABILITADO</th>
              <th style={{ textAlign: 'right' }}>ACCIONES</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    className="admin-product-image"
                    src={product.img}
                    alt={product.title}
                  />
                </td>

                <td>
                  <Box className="admin-product-info">
                    <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary' }}>
                      {product.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                      SKU: {product.sku}
                    </Typography>
                  </Box>
                </td>

                <td>
                  <span className="admin-category-badge">
                    {product.category}
                  </span>
                </td>

                <td className="admin-price">
                  ${Number(product.price).toFixed(2)}
                </td>

                <td>
                  <Typography
                    component="span"
                    variant="body2"
                    className={product.stock <= 10 ? 'stock-low' : ''}
                    sx={{ fontWeight: 'bold' }}
                  >
                    {product.stock}
                  </Typography>

                  {product.stock <= 10 && (
                    <Typography component="span" variant="caption" className="stock-low-text" sx={{ fontWeight: 800, ml: 0.5 }}>
                      BAJO
                    </Typography>
                  )}
                </td>

                <td style={{ textAlign: 'center' }}>
                  <Switch
                    checked={product.enabled}
                    onChange={() => onToggleEnabled(product.id)}
                    color="success"
                    size="small"
                  />
                </td>

                <td>
                  <Box className="admin-actions" sx={{ justifyContent: 'flex-end' }}>
                    <IconButton
                      aria-label="Editar producto"
                      onClick={() => onRequestEdit(product)}
                      size="small"
                      sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      aria-label="Eliminar producto"
                      onClick={() => onRequestDelete(product)}
                      size="small"
                      sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                    >
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="7" className="admin-empty-table">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    No se encontraron productos para esa búsqueda.
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Box className="admin-table-footer">
          <Typography variant="body2">{showingText}</Typography>

          <Box className="admin-pagination">
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <KeyboardArrowLeftIcon />
            </IconButton>

            <Button
              size="small"
              variant="contained"
              sx={{
                minWidth: '32px',
                width: '32px',
                height: '32px',
                p: 0,
                borderRadius: '6px',
                bgcolor: 'primary.light',
                color: 'background.default',
                fontWeight: 'bold',
              }}
            >
              1
            </Button>

            <Button
              size="small"
              sx={{
                minWidth: '32px',
                width: '32px',
                height: '32px',
                p: 0,
                color: 'text.primary',
              }}
            >
              2
            </Button>

            <Button
              size="small"
              sx={{
                minWidth: '32px',
                width: '32px',
                height: '32px',
                p: 0,
                color: 'text.primary',
              }}
            >
              3
            </Button>

            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <KeyboardArrowRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}