import CloseIcon from '@mui/icons-material/Close'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import './styles.scss'

const DEFAULT_PRODUCT_IMAGE =
  'https://placehold.co/96x96/2a2b36/f4f4fb?text=WP'

export const AdminProductModal = ({ open, onClose, onCreate }) => {
  if (!open) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const newProduct = {
      id: Date.now(),
      image: DEFAULT_PRODUCT_IMAGE,
      name: formData.get('name'),
      sku: formData.get('sku'),
      category: formData.get('category'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      enabled: true,
    }

    onCreate(newProduct)
    event.currentTarget.reset()
  }

  return (
    <div className="admin-product-modal-overlay">
      <form className="admin-product-modal" onSubmit={handleSubmit}>
        <header className="admin-product-modal-header">
          <div>
            <h2>Crear Nuevo Producto</h2>
            <p>Introduce los detalles técnicos del nuevo equipo de padel.</p>
          </div>

          <button
            type="button"
            className="admin-product-modal-close"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <CloseIcon />
          </button>
        </header>

        <section className="admin-product-modal-body">
          <div className="admin-product-images-column">
            <h3>IMAGEN DEL PRODUCTO</h3>

            <div className="admin-product-upload-box">
              <CloudUploadOutlinedIcon />
              <strong>Arrastra o sube una imagen</strong>
              <span>Formatos: JPG, PNG, WEBP (Máx 5MB)</span>
            </div>

            <div className="admin-product-thumbnails">
              <button type="button">
                <PhotoCameraOutlinedIcon />
              </button>
              <button type="button" />
              <button type="button" />
            </div>
          </div>

          <div className="admin-product-form-column">
            <label className="admin-form-field full">
              <span>Product Name</span>
              <input
                name="name"
                type="text"
                placeholder="Ej: Wilson Carbon Force Pro"
                required
              />
            </label>

            <div className="admin-form-row">
              <label className="admin-form-field">
                <span>SKU</span>
                <input
                  name="sku"
                  type="text"
                  placeholder="WP-CAN-001"
                  required
                />
              </label>

              <label className="admin-form-field">
                <span>Category</span>
                <select name="category" defaultValue="PALETAS" required>
                  <option value="PALETAS">Paletas</option>
                  <option value="PELOTAS">Pelotas</option>
                  <option value="ACCESORIOS">Accesorios</option>
                  <option value="INDUMENTARIA">Indumentaria</option>
                </select>
              </label>
            </div>

            <label className="admin-form-field full">
              <span>Description</span>
              <textarea
                name="description"
                placeholder="Describe las características técnicas y materiales..."
              />
            </label>

            <div className="admin-form-row">
              <label className="admin-form-field">
                <span>Price ($)</span>
                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </label>

              <label className="admin-form-field">
                <span>Stock</span>
                <input
                  name="stock"
                  type="number"
                  min="0"
                  placeholder="Cant. disponible"
                  required
                />
              </label>
            </div>

            <div className="admin-product-note">
              <InfoOutlinedIcon />
              <p>
                <strong>Nota:</strong> Al crear el producto, se notificará
                automáticamente a los usuarios que tengan este item en su
                "Lista de Deseos". Asegúrate de que las especificaciones sean
                precisas.
              </p>
            </div>
          </div>
        </section>

        <footer className="admin-product-modal-footer">
          <button
            type="button"
            className="admin-modal-cancel-button"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button type="submit" className="admin-modal-submit-button">
            <SaveOutlinedIcon />
            Crear Producto
          </button>
        </footer>
      </form>
    </div>
  )
}