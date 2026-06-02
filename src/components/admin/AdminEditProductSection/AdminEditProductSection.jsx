import { useState } from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import './styles.scss'

export const AdminEditProductSection = ({
  product,
  onCancel,
  onSave,
}) => {
  const [enabled, setEnabled] = useState(product.enabled)

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const updatedProduct = {
      ...product,
      name: formData.get('name'),
      description: formData.get('description'),
      sku: formData.get('sku'),
      category: formData.get('category'),
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      enabled,
    }

    onSave(updatedProduct)
  }

  return (
    <form className="admin-edit-product-section" onSubmit={handleSubmit}>
      <header className="admin-edit-product-header">
        <div>
          <p>Catálogo &gt; Editar Producto</p>

          <h1>Editar Producto</h1>

          <span>
            Actualiza los detalles técnicos y disponibilidad de{' '}
            <strong>{product.name}</strong>.
          </span>
        </div>

        <div className="admin-edit-product-header-actions">
          <button
            type="button"
            className="admin-edit-cancel-button"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button type="submit" className="admin-edit-save-button">
            Guardar Cambios
          </button>
        </div>
      </header>

      <div className="admin-edit-product-grid">
        <div className="admin-edit-product-left">
          <section className="admin-edit-card">
            <h2>
              <InfoOutlinedIcon />
              Información General
            </h2>

            <label className="admin-edit-field">
              <span>Nombre del Producto</span>
              <input
                name="name"
                type="text"
                defaultValue={product.name}
                required
              />
            </label>

            <label className="admin-edit-field">
              <span>Descripción</span>
              <textarea
                name="description"
                defaultValue={
                  product.description ||
                  'Diseñada para jugadores avanzados que buscan potencia máxima sin perder el control. El marco de fibra de carbono ofrece una respuesta eléctrica en cada smash.'
                }
              />
            </label>

            <div className="admin-edit-row">
              <label className="admin-edit-field">
                <span>SKU</span>
                <input
                  name="sku"
                  type="text"
                  defaultValue={product.sku}
                  required
                />
              </label>

              <label className="admin-edit-field">
                <span>Categoría</span>
                <select
                  name="category"
                  defaultValue={product.category}
                  required
                >
                  <option value="PALETAS">Paletas</option>
                  <option value="PELOTAS">Pelotas</option>
                  <option value="ACCESORIOS">Accesorios</option>
                  <option value="INDUMENTARIA">Indumentaria</option>
                </select>
              </label>
            </div>
          </section>

          <section className="admin-edit-card">
            <h2 className="price-title">
              <LocalOfferOutlinedIcon />
              Precio y Disponibilidad
            </h2>

            <div className="admin-edit-row">
              <label className="admin-edit-field">
                <span>Precio (EUR)</span>

                <div className="admin-edit-price-wrapper">
                  <span>€</span>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={product.price}
                    required
                  />
                </div>
              </label>

              <label className="admin-edit-field">
                <span>Stock Actual</span>
                <input
                  name="stock"
                  type="number"
                  min="0"
                  defaultValue={product.stock}
                  required
                />
              </label>
            </div>
          </section>
        </div>

        <aside className="admin-edit-product-right">
          <section className="admin-edit-image-card">
            <h2>
              <ImageOutlinedIcon />
              Imagen del Producto
            </h2>

            <img
              className="admin-edit-product-image"
              src={product.image}
              alt={product.name}
            />

            <button type="button" className="admin-edit-upload-box">
              <CloudUploadOutlinedIcon />
              <strong>Reemplazar Imagen</strong>
              <span>JPG, PNG o WEBP (Máx. 5MB)</span>
            </button>

            <div className="admin-edit-publication-box">
              <p>ESTADO DE PUBLICACIÓN</p>

              <div className="admin-edit-visible-row">
                <div>
                  <span className="admin-edit-visible-dot" />
                  <strong>Visible en Tienda</strong>
                </div>

                <button
                  type="button"
                  className={`admin-edit-switch ${enabled ? 'active' : ''}`}
                  onClick={() => setEnabled((current) => !current)}
                >
                  <span />
                </button>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </form>
  )
}