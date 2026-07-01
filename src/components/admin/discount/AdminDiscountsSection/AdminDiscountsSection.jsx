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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import PercentIcon from '@mui/icons-material/Percent'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { ConfirmationDialog } from '../../../general/ConfirmationDialog/ConfirmationDialog'
import { AdminSectionLayout } from '../../shared/AdminSectionLayout/AdminSectionLayout'
import { AdminStatsGrid } from '../../shared/AdminStatsGrid/AdminStatsGrid'
import { AdminTableCard } from '../../shared/AdminTableCard/AdminTableCard'
import { TablePaginationFooter } from '../../../general/TablePaginationFooter/TablePaginationFooter'
import { buildShowingLabel } from '../../../../utils/paginationLabels'
import { usePagination } from '../../../../hooks/usePagination'
import { getProductImageUrl } from '../../../../utils/products'
import '../../styles.scss'
import './styles.scss'

const defaultEndDate = () =>
  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

const buildEmptyForm = (products) => ({
  productId: products[0]?.id || '',
  percentage: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: defaultEndDate(),
  active: true,
})

export const AdminDiscountsSection = ({
  title,
  subtitle,
  products = [],
  discounts = [],
  onAddDiscount,
  onEditDiscount,
  onDeleteDiscount,
  onToggleStatus,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDiscount, setEditingDiscount] = useState(null)
  const [form, setForm] = useState(() => buildEmptyForm(products))
  const [discountToDelete, setDiscountToDelete] = useState(null)
  const [discountToToggle, setDiscountToToggle] = useState(null)

  const isEditMode = Boolean(editingDiscount)
  const nextDiscountActive = discountToToggle?.status !== 'Activado'

  const handleOpenCreate = () => {
    setEditingDiscount(null)
    setForm(buildEmptyForm(products))
    setIsModalOpen(true)
  }

  const handleOpenEdit = (discount) => {
    setEditingDiscount(discount)
    setForm({
      productId: discount.productId,
      percentage: discount.percentage,
      startDate: discount.startDate,
      endDate: discount.endDate,
      active: discount.status === 'Activado',
    })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingDiscount(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const productId = Number(form.productId)
    const product = products.find((p) => p.id === productId)
    if (!product) return

    const discountData = {
      productId,
      productTitle: product.nombre,
      productImg: getProductImageUrl(product),
      productCategory: product.categoria,
      percentage: Number(form.percentage),
      startDate: form.startDate,
      endDate: form.endDate,
      status: form.active ? 'Activado' : 'Desactivado',
    }

    if (isEditMode) {
      onEditDiscount({ ...editingDiscount, ...discountData })
    } else {
      onAddDiscount({ id: Date.now(), ...discountData })
    }

    handleCloseModal()
  }

  const handleConfirmDelete = () => {
    if (discountToDelete) {
      onDeleteDiscount(discountToDelete.id)
    }
  }

  const activeDiscounts = discounts.filter((d) => d.status === 'Activado').length
  const inactiveDiscounts = discounts.filter((d) => d.status === 'Desactivado').length

  const { paginatedItems, page, setPage, totalPages, rangeStart, rangeEnd, totalCount } =
    usePagination(discounts, 10)

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
          onClick={handleOpenCreate}
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
            label={buildShowingLabel(rangeStart, rangeEnd, totalCount, 'promociones')}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
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
              <th style={{ textAlign: 'right', width: '140px' }}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((discount) => (
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
                    onChange={() => setDiscountToToggle(discount)}
                    color="success"
                    size="small"
                  />
                </td>
                <td>
                  <Box className="admin-actions admin-actions--end">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenEdit(discount)}
                      className="admin-icon-btn admin-icon-btn--edit"
                      aria-label="Editar descuento"
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setDiscountToDelete(discount)}
                      className="admin-icon-btn admin-icon-btn--danger"
                      aria-label="Eliminar descuento"
                    >
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
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
        <form onSubmit={handleSubmit} key={editingDiscount?.id ?? 'new'}>
          <DialogTitle>
            <Box className="admin-dialog-header-row">
              <Typography variant="h6" className="admin-dialog-title">
                {isEditMode ? 'Editar descuento' : 'Nuevo descuento'}
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
                value={form.productId}
                onChange={(e) => setForm((prev) => ({ ...prev, productId: e.target.value }))}
                label="Producto"
                required
              >
                {products.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box className="admin-form-grid-2">
              <TextField
                label="Porcentaje (%)"
                type="number"
                placeholder="15"
                required
                variant="outlined"
                value={form.percentage}
                onChange={(e) => setForm((prev) => ({ ...prev, percentage: e.target.value }))}
                slotProps={{ htmlInput: { min: 5, max: 90 } }}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={form.active}
                    onChange={(e) => setForm((prev) => ({ ...prev, active: e.target.checked }))}
                    color="success"
                  />
                }
                label="Activar ahora"
                className="admin-form-switch-row"
              />
            </Box>

            <Box className="admin-form-grid-2">
              <TextField
                label="Fecha de Inicio"
                type="date"
                required
                variant="outlined"
                value={form.startDate}
                onChange={(e) => setForm((prev) => ({ ...prev, startDate: e.target.value }))}
                slotProps={{ inputLabel: { shrink: true } }}
              />

              <TextField
                label="Fecha de Fin"
                type="date"
                required
                variant="outlined"
                value={form.endDate}
                onChange={(e) => setForm((prev) => ({ ...prev, endDate: e.target.value }))}
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
              startIcon={isEditMode ? <SaveOutlinedIcon /> : <PercentIcon />}
              className="admin-btn-bold admin-btn-primary"
            >
              {isEditMode ? 'Guardar cambios' : 'Aplicar descuento'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <ConfirmationDialog
        open={Boolean(discountToToggle)}
        onClose={() => setDiscountToToggle(null)}
        onConfirm={() => discountToToggle && onToggleStatus(discountToToggle.id)}
        title={nextDiscountActive ? '¿Activar este descuento?' : '¿Desactivar este descuento?'}
        subtitle={
          nextDiscountActive
            ? 'La promoción comenzará a aplicarse según las fechas configuradas.'
            : 'La promoción dejará de estar activa.'
        }
        confirmLabel={nextDiscountActive ? 'Activar' : 'Desactivar'}
        cancelLabel="Cancelar"
        confirmColor={nextDiscountActive ? 'success' : 'warning'}
        center
      />

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
