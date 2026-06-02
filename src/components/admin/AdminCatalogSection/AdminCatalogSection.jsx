import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { adminCatalogStats, adminProducts } from '../../../data/adminProductsData'
import './styles.scss'

export const AdminCatalogSection = ({ searchTerm = '' }) => {
  const normalizedSearch = searchTerm.toLowerCase().trim()

  const filteredProducts = adminProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.sku.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch)
    )
  })

  return (
    <section className="admin-catalog-section">
      <div className="admin-stats-grid">
        {adminCatalogStats.map((stat) => (
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
                  ${product.price.toFixed(2)}
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
                  >
                    <span />
                  </button>
                </td>

                <td>
                  <div className="admin-actions">
                    <button type="button" aria-label="Editar producto">
                      <EditOutlinedIcon />
                    </button>

                    <button type="button" aria-label="Eliminar producto">
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
          <p>
            Mostrando {filteredProducts.length} de 1,284 productos
          </p>

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