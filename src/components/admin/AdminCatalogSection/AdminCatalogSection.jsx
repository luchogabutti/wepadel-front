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
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.sku.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch)
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
    <section className="admin-catalog-section">
      <div className="admin-stats-grid">
        {catalogStats.map((stat) => (
          <article key={stat.id} className="admin-stat-card">
            <p className="admin-stat-label">{stat.label}</p>
            <strong className={`admin-stat-value ${stat.variant}`}>
              {stat.value}
            </strong>
          </article>
        ))}
      </div>

      <div className="admin-products-table-card">
        <table className="admin-products-table">
          <thead>
            <tr>
              <th>IMAGEN</th>
              <th>NOMBRE</th>
              <th>CATEGORÍA</th>
              <th>PRECIO</th>
              <th>STOCK</th>
              <th>HABILITADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    className="admin-product-image"
                    src={product.image}
                    alt={product.name}
                  />
                </td>

                <td>
                  <div className="admin-product-info">
                    <strong>{product.name}</strong>
                    <span>SKU: {product.sku}</span>
                  </div>
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
                  <span className={product.stock <= 10 ? 'stock-low' : ''}>
                    {product.stock}
                  </span>

                  {product.stock <= 10 && (
                    <span className="stock-low-text"> BAJO</span>
                  )}
                </td>

                <td>
                  <button
                    type="button"
                    className={`admin-switch ${product.enabled ? 'active' : ''}`}
                    aria-label="Cambiar estado del producto"
                    onClick={() => onToggleEnabled(product.id)}
                  >
                    <span />
                  </button>
                </td>

                <td>
                  <div className="admin-actions">
                    <button
                      type="button"
                      aria-label="Editar producto"
                      onClick={() => onRequestEdit(product)}
                    >
                      <EditOutlinedIcon />
                    </button>

                    <button
                      type="button"
                      aria-label="Eliminar producto"
                      onClick={() => onRequestDelete(product)}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="7" className="admin-empty-table">
                  No se encontraron productos para esa búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="admin-table-footer">
          <p>{showingText}</p>

          <div className="admin-pagination">
            <button type="button">
              <KeyboardArrowLeftIcon />
            </button>

            <button type="button" className="active">
              1
            </button>

            <button type="button">2</button>
            <button type="button">3</button>

            <button type="button">
              <KeyboardArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}