import CloseIcon from '@mui/icons-material/Close'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import './styles.scss'

export const AdminProductModal = ({ open, onClose }) => {
  if (!open) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Producto creado de forma mockeada')
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
              <input type="text" placeholder="Ej: Wilson Carbon Force Pro" />
            </label>

            <div className="admin-form-row">
              <label className="admin-form-field">
                <span>SKU</span>
                <input type="text" placeholder="WP-CAN-001" />
              </label>

              <label className="admin-form-field">
                <span>Category</span>
                <select defaultValue="Paletas">
                  <option>Paletas</option>
                  <option>Pelotas</option>
                  <option>Accesorios</option>
                  <option>Indumentaria</option>
                </select>
              </label>
            </div>

            <label className="admin-form-field full">
              <span>Description</span>
              <textarea placeholder="Describe las características técnicas y materiales..." />
            </label>

            <div className="admin-form-row">
              <label className="admin-form-field">
                <span>Price ($)</span>
                <input type="number" placeholder="0.00" />
              </label>

              <label className="admin-form-field">
                <span>Stock</span>
                <input type="number" placeholder="Cant. disponible" />
              </label>
            </div>

            <div className="admin-product-note">
              <InfoOutlinedIcon />
              <p>
                <strong>Nota:</strong> Al crear el producto, se notificará automáticamente a los usuarios que tengan este item en su "Lista de Deseos". Asegúrate de que las especificaciones sean precisas.
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