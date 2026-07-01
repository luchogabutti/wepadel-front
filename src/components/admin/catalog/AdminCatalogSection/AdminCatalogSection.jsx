import { Box, Typography, IconButton, Switch } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { AdminSectionLayout } from '../../shared/AdminSectionLayout/AdminSectionLayout'
import { AdminStatsGrid } from '../../shared/AdminStatsGrid/AdminStatsGrid'
import { AdminTableCard } from '../../shared/AdminTableCard/AdminTableCard'
import { TablePaginationFooter } from '../../../general/TablePaginationFooter/TablePaginationFooter'
import { buildShowingLabel } from '../../../../utils/paginationLabels'
import { usePagination } from '../../../../hooks/usePagination'
import { getProductImageUrl, PLACEHOLDER_IMG } from '../../../../utils/products'
import '../../styles.scss'

export const AdminCatalogSection = ({
  searchTerm = '',
  products = [],
  onRequestEdit,
  onRequestDelete,
  onRequestToggleEnabled,
}) => {
  const normalizedSearch = searchTerm.toLowerCase().trim()

  const filteredProducts = products.filter((product) => {
    return (
      product.nombre.toLowerCase().includes(normalizedSearch) ||
      String(product.id).includes(normalizedSearch) ||
      (product.categoria || '').toLowerCase().includes(normalizedSearch)
    )
  })

  const { paginatedItems, page, setPage, totalPages, rangeStart, rangeEnd, totalCount } =
    usePagination(filteredProducts, 10)

  const totalProducts = products.length
  const activeProducts = products.filter((product) => product.estaHabilitado !== false).length
  const categoriesCount = new Set(products.map((product) => product.categoria)).size

  const catalogStats = [
    {
      id: 'total-products',
      label: 'TOTAL PRODUCTOS',
      value: totalProducts,
      variant: 'default',
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

  const tableFooter = (
    <TablePaginationFooter
      label={buildShowingLabel(rangeStart, rangeEnd, totalCount, 'productos')}
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  )

  return (
    <AdminSectionLayout className="admin-catalog-section">
      <AdminStatsGrid stats={catalogStats} />

      <AdminTableCard footer={tableFooter}>
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
            {paginatedItems.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    className="admin-product-image"
                    src={getProductImageUrl(product)}
                    alt={product.nombre}
                  />
                </td>

                <td>
                  <Box className="admin-product-info">
                    <Typography variant="body2" className="admin-product-info__title">
                      {product.nombre}
                    </Typography>
                    <Typography variant="caption" className="admin-product-info__sku">
                      ID: {product.id}
                    </Typography>
                  </Box>
                </td>

                <td>
                  <span className="admin-category-badge">
                    {product.categoria}
                  </span>
                </td>

                <td className="admin-price">
                  ${Number(product.precio).toFixed(2)}
                </td>

                <td>
                  <Box className="admin-stock-cell">
                    <Typography
                      component="span"
                      variant="body2"
                      className={`admin-stock-cell__value ${product.stock <= 10 ? 'stock-low' : ''}`}
                    >
                      {product.stock}
                    </Typography>
                    {product.stock <= 10 && (
                      <span className="stock-low-text">BAJO</span>
                    )}
                  </Box>
                </td>

                <td style={{ textAlign: 'center' }}>
                  <Switch
                    checked={product.estaHabilitado !== false}
                    onChange={() => onRequestToggleEnabled(product)}
                    color="success"
                    size="small"
                  />
                </td>

                <td>
                  <Box className="admin-actions admin-actions--end">
                    <IconButton
                      aria-label="Editar producto"
                      onClick={() => onRequestEdit(product)}
                      size="small"
                      className="admin-icon-btn admin-icon-btn--edit"
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      aria-label="Eliminar producto"
                      onClick={() => onRequestDelete(product)}
                      size="small"
                      className="admin-icon-btn admin-icon-btn--danger"
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
                  <Typography variant="body2" className="admin-empty-message">
                    No se encontraron productos para esa búsqueda.
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </AdminTableCard>
    </AdminSectionLayout>
  )
}
