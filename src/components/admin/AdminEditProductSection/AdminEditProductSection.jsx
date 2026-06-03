import { useState } from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
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
      title: formData.get('title'),
      name: formData.get('title'), // compatibility
      description: formData.get('description'),
      sku: formData.get('sku'),
      categoryId: formData.get('categoryId'),
      category: formData.get('categoryId').toUpperCase(), // compatibility
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      enabled,
    }

    onSave(updatedProduct)
  }

  return (
    <form className="admin-edit-product-section" onSubmit={handleSubmit}>
      <header className="admin-edit-product-header">
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold', letterSpacing: 1.2 }}>
            CATÁLOGO &gt; EDITAR PRODUCTO
          </Typography>

          <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mt: 0.5, fontFamily: 'Outfit' }}>
            Editar Producto
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Actualiza los detalles técnicos y disponibilidad de{' '}
            <strong>{product.title}</strong>.
          </Typography>
        </Box>

        <Box className="admin-edit-product-header-actions">
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{ fontWeight: 'bold', color: 'text.secondary', borderColor: 'rgba(255,255,255,0.15)' }}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ fontWeight: 'bold' }}
          >
            Guardar Cambios
          </Button>
        </Box>
      </header>

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

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
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
                    <MenuItem value="indumentaria">Indumentaria</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>

          <Box className="admin-edit-card surface-card" sx={{ mt: 3 }}>
            <Typography variant="h6" className="admin-card-title">
              <LocalOfferOutlinedIcon />
              Precio y Disponibilidad
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 2 }}>
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

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, my: 2 }}>
              <img
                className="admin-edit-product-image"
                src={product.img}
                alt={product.title}
              />

              <Button
                variant="outlined"
                fullWidth
                startIcon={<CloudUploadOutlinedIcon />}
                className="admin-edit-upload-btn"
                sx={{ borderStyle: 'dashed', color: 'text.secondary', py: 1.2 }}
              >
                Reemplazar Imagen
              </Button>
            </Box>

            <Box className="admin-edit-publication-box">
              <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', letterSpacing: 1.2, display: 'block', mb: 1.5 }}>
                ESTADO DE PUBLICACIÓN
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
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