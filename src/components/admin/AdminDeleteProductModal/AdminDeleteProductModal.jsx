import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import './styles.scss'

export const AdminDeleteProductModal = ({
  open,
  product,
  onClose,
  onConfirm,
}) => {
  if (!open || !product) {
    return null
  }

  return (
    <div className="admin-delete-modal-overlay">
      <div className="admin-delete-modal">
        <div className="admin-delete-warning-icon">
          <WarningAmberOutlinedIcon />
        </div>

        <h2>
          ¿Estás seguro de que deseas
          <br />
          eliminar este producto?
        </h2>

        <div className="admin-delete-selected-product">
          <span>PRODUCTO SELECCIONADO</span>
          <strong>{product.name}</strong>
        </div>

        <p className="admin-delete-description">
          Esta acción es irreversible. Se eliminarán todos los registros de
          stock y las estadísticas asociadas a este modelo del catálogo activo.
        </p>

        <div className="admin-delete-actions">
          <button
            type="button"
            className="admin-delete-cancel-button"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="admin-delete-confirm-button"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>

        <div className="admin-delete-bottom-line" />
      </div>
    </div>
  )
}