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
import CloseIcon from '@mui/icons-material/Close'
import PercentIcon from '@mui/icons-material/Percent'
import { ConfirmationDialog } from '../../../general/ConfirmationDialog/ConfirmationDialog'
import { AdminSectionLayout } from '../../shared/AdminSectionLayout/AdminSectionLayout'
import { AdminStatsGrid } from '../../shared/AdminStatsGrid/AdminStatsGrid'
import { AdminTableCard } from '../../shared/AdminTableCard/AdminTableCard'
import {
  TablePaginationFooter,
  buildShowingLabel,
} from '../../../general/TablePaginationFooter/TablePaginationFooter'
import '../../styles.scss'
import './styles.scss'

export const AdminDiscountsSection = ({
  title,
  subtitle,
  products = [],
  discounts = [],
  onAddDiscount,
  onDeleteDiscount,
  onToggleStatus,
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
      status: formData.get('active') === 'on' ? 'Activado' : 'Desactivado',
    }

    onAddDiscount(newDiscount)
    setIsModalOpen(false)
  }

  const handleConfirmDelete = () => {
    if (discountToDelete) {
      onDeleteDiscount(discountToDelete.id)
    }
  }

  const activeDiscounts = discounts.filter((d) => d.status === 'Activado').length
  const inactiveDiscounts = discounts.filter((d) => d.status === 'Desactivado').length

  const stats = [
    {
      id: 'active-promos',
      label: 'PROMOCIONES ACTIVAS',
      value: activeDiscounts,
      variant: 'success',
    },
    {
      id: 'inactive-promos',
      label: 'DESCUENTOS INACTIVOS',
      value: inactiveDiscounts,
      variant: 'warning',
    },
  ]

  return (
    <AdminSectionLayout
      className="admin-discounts-section"
      title={title}
      subtitle={subtitle}
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
    >
      <AdminStatsGrid stats={stats} />

      <AdminTableCard
        footer={
          <TablePaginationFooter
            label={buildShowingLabel(discounts.length, discounts.length, 'promociones')}
          />
        }
      >
        <table className="admin-products-table">
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th style={{ textAlign: 'center', width: '150px' }}>% DESCUENTO</th>
              <th>FECHA INICIO</th>
              <th>FECHA FIN</th>
              <th style={{ textAlign: 'center', width: '120px' }}>HABILITADO</th>
              <th style={{ textAlign: 'right', width: '120px' }}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount.id}>
                <td>
                  <Box className="admin-discount-product-row">
                    <img
                      className="admin-product-image"
                      src={discount.productImg}
                      alt={discount.productTitle}
                    />
                    <Box className="admin-product-info">
                      <Typography variant="body2" className="admin-product-info__title">
                        {discount.productTitle}
                      </Typography>
                      <Typography variant="caption" className="admin-product-info__sku">
                        {discount.productCategory}
                      </Typography>
                    </Box>
                  </Box>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <Typography variant="h6" className="admin-discount-percent">
                    {discount.percentage}%
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2" className="admin-discount-date">
                    {discount.startDate}
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2" className="admin-discount-date">
                    {discount.endDate}
                  </Typography>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <Switch
                    checked={discount.status === 'Activado'}
                    onChange={() => onToggleStatus(discount.id)}
                    color="success"
                    size="small"
                  />
                </td>
                <td style={{ textAlign: 'right' }}>
                  <IconButton
                    size="small"
                    onClick={() => setDiscountToDelete(discount)}
                    className="admin-icon-btn admin-icon-btn--danger"
                    aria-label="Eliminar descuento"
                  >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </td>
              </tr>
            ))}
            {discounts.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'gray' }}>
                  <Typography variant="body2" className="admin-empty-message">
                    No hay promociones o descuentos activos en este momento.
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </AdminTableCard>

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        slotProps={{
          paper: {
            className: 'admin-dialog-paper admin-dialog-paper--form',
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            <Box className="admin-dialog-header-row">
              <Typography variant="h6" className="admin-dialog-title">
                Nuevo Descuento
              </Typography>
              <IconButton
                onClick={handleCloseModal}
                size="small"
                className="admin-icon-btn"
                aria-label="Cerrar"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent dividers className="admin-dialog-body--form">
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

            <Box className="admin-form-grid-2">
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
                className="admin-form-switch-row"
              />
            </Box>

            <Box className="admin-form-grid-2">
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

          <DialogActions className="admin-dialog-footer">
            <Button onClick={handleCloseModal} className="admin-btn-ghost" variant="outlined" color="inherit">
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<PercentIcon />}
              className="admin-btn-bold admin-btn-primary"
            >
              Aplicar Descuento
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <ConfirmationDialog
        open={Boolean(discountToDelete)}
        onClose={() => setDiscountToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar este descuento?"
        subtitle="Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        confirmColor="error"
        center
      />
    </AdminSectionLayout>
  )
}
