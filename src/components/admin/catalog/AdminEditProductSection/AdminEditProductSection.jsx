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
  FormControlLabel,
} from '@mui/material'
import { PageHeader } from '../../../layout/PageHeader'
import { AdminProductImageUpload } from '../AdminProductImageUpload/AdminProductImageUpload'
import '../../styles.scss'
import './styles.scss'

export const AdminEditProductSection = ({
  product,
  onCancel,
  onSave,
}) => {
  const [enabled, setEnabled] = useState(product.enabled)
  const [imageFile, setImageFile] = useState(null)
  const [imageError, setImageError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const updatedProduct = {
      ...product,
      title: formData.get('title'),
      name: formData.get('title'),
      description: formData.get('description'),
      sku: formData.get('sku'),
      categoryId: formData.get('categoryId'),
      category: formData.get('categoryId').toUpperCase(),
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      enabled,
      imagenId: product.imagenId,
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
            <strong>{product.title}</strong>.
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
                name="title"
                label="Nombre del Producto"
                defaultValue={product.title}
                fullWidth
                required
                variant="outlined"
              />

              <TextField
                name="description"
                label="Descripción"
                multiline
                rows={4}
                defaultValue={
                  product.description ||
                  'Diseñada para jugadores avanzados que buscan potencia máxima sin perder el control.'
                }
                fullWidth
                variant="outlined"
              />

              <Box className="admin-form-grid-2--responsive">
                <TextField
                  name="sku"
                  label="SKU"
                  defaultValue={product.sku}
                  required
                  variant="outlined"
                />

                <FormControl fullWidth>
                  <InputLabel id="edit-category-label">Categoría</InputLabel>
                  <Select
                    labelId="edit-category-label"
                    name="categoryId"
                    defaultValue={product.categoryId ?? 'paletas'}
                    label="Categoría"
                  >
                    <MenuItem value="paletas">Paletas</MenuItem>
                    <MenuItem value="pelotas">Pelotas</MenuItem>
                    <MenuItem value="accesorios">Accesorios</MenuItem>
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
                name="price"
                label="Precio ($)"
                type="number"
                defaultValue={product.price}
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
                currentImage={product.img}
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
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
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