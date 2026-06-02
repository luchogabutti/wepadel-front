import CloseIcon from '@mui/icons-material/Close'
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
        <button
          type="button"
          className="admin-delete-modal-close"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <CloseIcon />
        </button>

        <div className="admin-delete-icon">
          <WarningAmberOutlinedIcon />
        </div>

        <h2>¿Estás seguro de que deseas eliminar este producto?</h2>

        <p>
          Se eliminará <strong>{product.name}</strong> del catálogo. Esta acción
          no se puede deshacer.
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
      </div>
    </div>
  )
}