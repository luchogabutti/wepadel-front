import { useState } from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
} from '@mui/material'
import { PageHeader } from '../../../layout/PageHeader'
import { AdminProductImageUpload } from '../AdminProductImageUpload/AdminProductImageUpload'
import { useSelector } from 'react-redux'
import { getProductImageUrl, PLACEHOLDER_IMG } from '../../../../utils/products'
import '../../styles.scss'
import './styles.scss'

export const AdminEditProductSection = ({
  product,
  onCancel,
  onSave,
}) => {
  const categorias = useSelector((state) => state.categories.items)
  const [estaHabilitado, setEstaHabilitado] = useState(product.estaHabilitado !== false)
  const [imageFile, setImageFile] = useState(null)
  const [imageError, setImageError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const updatedProduct = {
      ...product,
      nombre: formData.get('nombre'),
      descripcion: formData.get('descripcion'),
      categoria: formData.get('categoria').toUpperCase(),
      precio: Number(formData.get('precio')),
      stock: Number(formData.get('stock')),
      estaHabilitado,
      imageFile,
    }

    onSave(updatedProduct)
  }

  return (
    <form className="admin-edit-product-section" onSubmit={handleSubmit}>
      <PageHeader
        variant="profile"
        title="Editar Producto"
        subtitle={
          <>
            Actualiza los detalles técnicos y disponibilidad de{' '}
            <strong>{product.nombre}</strong>.
          </>
        }
        alignActions="center"
        actions={
          <>
            <Button variant="outlined" onClick={onCancel} className="admin-btn-outlined-muted">
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="admin-btn-bold admin-btn-primary"
            >
              Guardar Cambios
            </Button>
          </>
        }
      />

      <Box className="admin-edit-product-grid">
        <Box className="admin-edit-product-left">
          <Box className="admin-edit-card surface-card">
            <Typography variant="h6" className="admin-card-title">
              <InfoOutlinedIcon />
              Información General
            </Typography>

            <Box className="admin-form-fields-stack">
              <TextField
                name="nombre"
                label="Nombre del Producto"
                defaultValue={product.nombre}
                fullWidth
                required
                variant="outlined"
              />

              <TextField
                name="descripcion"
                label="Descripción"
                multiline
                rows={4}
                defaultValue={
                  product.descripcion ||
                  'Diseñada para jugadores avanzados que buscan potencia máxima sin perder el control.'
                }
                fullWidth
                variant="outlined"
              />

              <Box className="admin-form-grid-2--responsive">
                <TextField
                  label="ID"
                  value={product.id}
                  disabled
                  variant="outlined"
                />

                <FormControl fullWidth>
                  <InputLabel id="edit-category-label">Categoría</InputLabel>
                  <Select
                    labelId="edit-category-label"
                    name="categoria"
                    defaultValue={(product.categoria || 'PALETAS').toLowerCase()}
                    label="Categoría"
                  >
                    {categorias.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>

          <Box className="admin-edit-card surface-card admin-edit-card--spaced">
            <Typography variant="h6" className="admin-card-title">
              <LocalOfferOutlinedIcon />
              Precio y Disponibilidad
            </Typography>

            <Box className="admin-form-grid-2--responsive admin-form-grid-2--responsive--spaced-top">
              <TextField
                name="precio"
                label="Precio ($)"
                type="number"
                defaultValue={product.precio}
                required
                variant="outlined"
                slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
              />

              <TextField
                name="stock"
                label="Stock Actual"
                type="number"
                defaultValue={product.stock}
                required
                variant="outlined"
                slotProps={{ htmlInput: { min: 0 } }}
              />
            </Box>
          </Box>
        </Box>

        <Box component="aside" className="admin-edit-product-right">
          <Box className="admin-edit-image-card surface-card">
            <Typography variant="h6" className="admin-card-title">
              <ImageOutlinedIcon />
              Imagen del Producto
            </Typography>

            <Box className="admin-edit-image-stack">
              <AdminProductImageUpload
                currentImage={getProductImageUrl(product)}
                onFileChange={setImageFile}
                onError={setImageError}
                uploadBoxClassName="admin-edit-upload-box"
                previewClassName="admin-edit-product-image"
              />
              {imageError && (
                <Typography variant="caption" color="error">
                  {imageError}
                </Typography>
              )}
            </Box>

            <Box className="admin-edit-publication-box">
              <Typography variant="caption" className="admin-edit-publication-label">
                ESTADO DE PUBLICACIÓN
              </Typography>

              <Box className="admin-edit-publication-row">
                <Typography variant="body2" className="admin-edit-visible-label">
                  Visible en Tienda
                </Typography>
                <Switch
                  checked={estaHabilitado}
                  onChange={(e) => setEstaHabilitado(e.target.checked)}
                  color="success"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  )
}
