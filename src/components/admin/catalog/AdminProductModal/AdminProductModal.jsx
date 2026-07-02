import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { AdminProductImageUpload } from '../AdminProductImageUpload/AdminProductImageUpload'
import { useSelector } from 'react-redux'
import { getProductImageUrl } from '../../../../utils/products'
import '../../styles.scss'
import './styles.scss'

export const AdminProductModal = ({
  open,
  productToEdit,
  onClose,
  onSave,
}) => {
  const categorias = useSelector((state) => state.categories.items)
  const isEditing = Boolean(productToEdit)
  const [imageFile, setImageFile] = useState(null)
  const [imageError, setImageError] = useState('')

  useEffect(() => {
    if (open) {
      setImageFile(null)
      setImageError('')
    }
  }, [open])

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const savedProduct = {
      ...productToEdit,
      nombre: formData.get('nombre'),
      categoria: formData.get('categoria').toUpperCase(),
      descripcion: formData.get('descripcion'),
      precio: Number(formData.get('precio')),
      stock: Number(formData.get('stock')),
      estaHabilitado: productToEdit?.estaHabilitado ?? true,
      imageFile,
    }

    onSave(savedProduct)
  }

  const handleClose = () => {
    setImageFile(null)
    setImageError('')
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="admin-product-dialog-root"
      slotProps={{
        paper: {
          className: 'admin-product-dialog-paper',
        },
      }}
      maxWidth="md"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle className="admin-product-dialog-header">
          <Box className="admin-product-dialog-header-row">
            <Box>
              <Typography variant="h5" className="admin-product-dialog-title">
                {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
              </Typography>
              <Typography variant="body2" className="admin-product-dialog-subtitle">
                {isEditing
                  ? 'Modifica los detalles técnicos del producto seleccionado.'
                  : 'Introduce los detalles técnicos del nuevo equipo de padel.'}
              </Typography>
            </Box>
            <IconButton
              onClick={handleClose}
              aria-label="Cerrar modal"
              className="admin-icon-btn"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent
          className="admin-product-dialog-body admin-product-dialog-body--dividers"
          dividers
        >
          <Box className="admin-product-dialog-grid">
            <Box className="admin-product-images-column">
              <Typography variant="caption" className="admin-product-images-caption">
              IMAGEN DEL PRODUCTO
            </Typography>

              <AdminProductImageUpload
                currentImage={productToEdit ? getProductImageUrl(productToEdit) : undefined}
                onFileChange={setImageFile}
                onError={setImageError}
              />
              {imageError && (
                <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                  {imageError}
                </Typography>
              )}
            </Box>

            <Box className="admin-product-form-column">
              <TextField
                name="nombre"
                label="Nombre del Producto"
                placeholder="Ej: Wilson Carbon Force Pro"
                defaultValue={productToEdit?.nombre ?? ''}
                fullWidth
                required
                variant="outlined"
                margin="normal"
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="category-select-label">Categoría</InputLabel>
                <Select
                  labelId="category-select-label"
                  name="categoria"
                  defaultValue={(productToEdit?.categoria || 'PALETAS').toLowerCase()}
                  label="Categoría"
                >
                  {categorias.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                name="descripcion"
                label="Descripción"
                placeholder="Describe las características técnicas y materiales..."
                defaultValue={productToEdit?.descripcion ?? ''}
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                margin="normal"
              />

              <Box className="admin-form-grid-2 admin-form-grid-2--spaced-top-sm">
                <TextField
                  name="precio"
                  label="Precio ($)"
                  type="number"
                  placeholder="0.00"
                  defaultValue={productToEdit?.precio ?? ''}
                  required
                  variant="outlined"
                  slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
                />

                <TextField
                  name="stock"
                  label="Stock Disponible"
                  type="number"
                  placeholder="Cant. disponible"
                  defaultValue={productToEdit?.stock ?? ''}
                  required
                  variant="outlined"
                  slotProps={{ htmlInput: { min: 0 } }}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions className="admin-product-dialog-footer">
          <Button onClick={handleClose} variant="text" className="admin-btn-ghost">
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveOutlinedIcon />}
            className="admin-btn-bold admin-btn-primary"
          >
            {isEditing ? 'Guardar cambios' : 'Crear Producto'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
