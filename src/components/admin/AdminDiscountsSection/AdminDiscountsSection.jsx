import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
} from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import AddIcon from '@mui/icons-material/Add'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import CloseIcon from '@mui/icons-material/Close'
import PercentIcon from '@mui/icons-material/Percent'
import { ConfirmationDialog } from '../../general/ConfirmationDialog/ConfirmationDialog'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import { AdminSectionHeader } from '../AdminSectionHeader/AdminSectionHeader'
import './styles.scss'

export const AdminDiscountsSection = ({
  products = [],
  discounts = [],
  onAddDiscount,
  onDeleteDiscount,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState('')
  const [discountToDelete, setDiscountToDelete] = useState(null)

  const handleOpenModal = () => {
    setSelectedProductId(products[0]?.id || '')
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const productId = Number(formData.get('productId'))
    const product = products.find((p) => p.id === productId)

    if (!product) return

    const newDiscount = {
      id: Date.now(),
      productId,
      productTitle: product.title,
      productImg: product.img,
      productCategory: product.categoryId.toUpperCase(),
      percentage: Number(formData.get('percentage')),
      startDate: formData.get('startDate') || new Date().toISOString().split('T')[0],
      endDate: formData.get('endDate') || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: formData.get('active') === 'on' ? 'Confirmada' : 'Pendiente',
    }

    onAddDiscount(newDiscount)
    setIsModalOpen(false)
  }

  const handleConfirmDelete = () => {
    if (discountToDelete) {
      onDeleteDiscount(discountToDelete.id)
      setDiscountToDelete(null)
    }
  }

  // Calculate Stats
  const activeDiscounts = discounts.filter((d) => d.status === 'Confirmada').length
  const avgDiscount = discounts.length > 0
    ? Math.round(discounts.reduce((sum, d) => sum + d.percentage, 0) / discounts.length)
    : 0
  const pendingDiscounts = discounts.filter((d) => d.status === 'Pendiente').length

  const stats = [
    {
      id: 'active-promos',
      label: 'PROMOCIONES ACTIVAS',
      value: activeDiscounts,
      variant: 'success',
    },
    {
      id: 'avg-saving',
      label: 'AHORRO PROMEDIO',
      value: `${avgDiscount}%`,
      variant: 'default',
    },
    {
      id: 'pending-promos',
      label: 'PENDIENTES DE ACTIVACIÓN',
      value: pendingDiscounts,
      variant: 'warning',
    },
  ]

  return (
    <Box className="admin-discounts-section">
      <AdminSectionHeader
        eyebrow="ADMIN › DESCUENTOS"
        title="Gestión de Descuentos"
        description="Configura promociones temporales para tus productos de alto rendimiento."
        alignActions="center"
        actions={
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            startIcon={<AddIcon />}
            className="admin-btn-bold admin-btn-primary"
          >
            Nuevo descuento
          </Button>
        }
      />

      <Box className="admin-stats-grid admin-stats-grid--spaced">
        {stats.map((stat) => (
          <Box key={stat.id} className="admin-stat-card">
            <Typography className="admin-stat-label">{stat.label}</Typography>
            <Typography variant="h4" component="strong" className={`admin-stat-value ${stat.variant}`}>
              {stat.value}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Table */}
      <Box className="admin-products-table-card">
        <table className="admin-products-table">
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th style={{ textAlign: 'center', width: '150px' }}>% DESCUENTO</th>
              <th>FECHA INICIO</th>
              <th>FECHA FIN</th>
              <th style={{ textAlign: 'center', width: '160px' }}>ESTADO</th>
              <th style={{ textAlign: 'right', width: '120px' }}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount.id}>
                <td>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img
                      className="admin-product-image"
                      src={discount.productImg}
                      alt={discount.productTitle}
                    />
                    <Box className="admin-product-info">
                      <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary' }}>
                        {discount.productTitle}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                        {discount.productCategory}
                      </Typography>
                    </Box>
                  </Box>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: 'success.main' }}>
                    {discount.percentage}%
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {discount.startDate}
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {discount.endDate}
                  </Typography>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`status-tag ${discount.status === 'Confirmada' ? 'active' : 'pending'}`}>
                    {discount.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => setDiscountToDelete(discount)}
                    sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                  >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </td>
              </tr>
            ))}
            {discounts.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'gray' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    No hay promociones o descuentos activos en este momento.
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Box>

      {/* Create Modal */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            border: '1px solid var(--mui-palette-divider)',
            borderRadius: 3,
            width: '100%',
            maxWidth: '500px',
          }
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'Outfit' }}>
                Nuevo Descuento
              </Typography>
              <IconButton onClick={handleCloseModal} size="small" sx={{ color: 'text.secondary' }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent dividers sx={{ borderColor: 'rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <FormControl fullWidth>
              <InputLabel id="discount-product-select">Producto</InputLabel>
              <Select
                labelId="discount-product-select"
                name="productId"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                label="Producto"
                required
              >
                {products.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                name="percentage"
                label="Porcentaje (%)"
                type="number"
                placeholder="15"
                required
                variant="outlined"
                slotProps={{ htmlInput: { min: 5, max: 90 } }}
              />

              <FormControlLabel
                control={<Switch name="active" defaultChecked color="success" />}
                label="Activar ahora"
                sx={{ ml: 0.5, height: '100%', display: 'flex', alignItems: 'center' }}
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                name="startDate"
                label="Fecha de Inicio"
                type="date"
                required
                variant="outlined"
                defaultValue={new Date().toISOString().split('T')[0]}
                slotProps={{ inputLabel: { shrink: true } }}
              />

              <TextField
                name="endDate"
                label="Fecha de Fin"
                type="date"
                required
                variant="outlined"
                defaultValue={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>
          </DialogContent>

          <DialogActions sx={{ padding: 2, bgcolor: 'surface.main' }}>
            <Button onClick={handleCloseModal} sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<PercentIcon />}
              sx={{ fontWeight: 'bold' }}
            >
              Aplicar Descuento
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmationDialog
        open={Boolean(discountToDelete)}
        onClose={() => setDiscountToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="¿Deseas eliminar este descuento?"
        subtitle={`Esta acción eliminará el descuento del producto "${discountToDelete?.productTitle}".`}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        confirmColor="error"
        center
        bottomLineColor="var(--mui-palette-error-main)"
        icon={
          <Box className="confirmation-dialog-icon-container">
            <WarningAmberOutlinedIcon />
          </Box>
        }
      >
        {discountToDelete && (
          <Box className="admin-delete-selected-product">
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', letterSpacing: 1.6, display: 'block', mb: 0.5 }}>
              PRODUCTO CON DESCUENTO
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 900, color: 'primary.light' }}>
              {discountToDelete.productTitle} ({discountToDelete.percentage}%)
            </Typography>
          </Box>
        )}
      </ConfirmationDialog>
    </Box>
  )
}
