import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { AdminSectionHeader } from '../AdminSectionHeader/AdminSectionHeader'
import './styles.scss'

export const AdminStockSection = ({
  products = [],
  onSaveStock,
}) => {
  // Local state to store temporary stock changes before saving
  const [localStocks, setLocalStocks] = useState(() => {
    const stocksMap = {}
    products.forEach((p) => {
      stocksMap[p.id] = p.stock
    })
    return stocksMap
  })

  const handleStockChange = (productId, newStock) => {
    const stockVal = Math.max(0, parseInt(newStock) || 0)
    setLocalStocks((prev) => ({
      ...prev,
      [productId]: stockVal,
    }))
  }

  const handleIncrement = (productId) => {
    setLocalStocks((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const handleDecrement = (productId) => {
    setLocalStocks((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) - 1),
    }))
  }

  const handleReset = () => {
    const stocksMap = {}
    products.forEach((p) => {
      stocksMap[p.id] = p.stock
    })
    setLocalStocks(stocksMap)
  }

  const handleSave = () => {
    const updatedProducts = products.map((p) => ({
      ...p,
      stock: localStocks[p.id] ?? p.stock,
      inStock: (localStocks[p.id] ?? p.stock) > 0,
    }))
    onSaveStock(updatedProducts)
  }

  // Calculate Stats
  const totalStock = Object.values(localStocks).reduce((a, b) => a + b, 0)
  const lowStockCount = Object.values(localStocks).filter((s) => s <= 10 && s > 0).length
  const outOfStockCount = Object.values(localStocks).filter((s) => s === 0).length

  const stats = [
    {
      id: 'total-stock',
      label: 'CANTIDAD TOTAL STOCK',
      value: totalStock,
      variant: 'default',
    },
    {
      id: 'low-stock',
      label: 'PRODUCTOS STOCK BAJO (<=10)',
      value: lowStockCount,
      variant: 'warning',
    },
    {
      id: 'out-of-stock',
      label: 'PRODUCTOS SIN STOCK',
      value: outOfStockCount,
      variant: 'danger',
    },
  ]

  const hasChanges = products.some((p) => localStocks[p.id] !== p.stock)

  return (
    <Box className="admin-stock-section">
      <AdminSectionHeader
        eyebrow="ADMIN › STOCK"
        title="Control de Inventario"
        description="Gestiona de forma masiva los niveles de disponibilidad de la tienda."
        alignActions="center"
        actions={
          <>
            {hasChanges && (
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleReset}
                startIcon={<SettingsBackupRestoreIcon />}
                className="admin-btn-bold"
              >
                Deshacer
              </Button>
            )}
            <Button
              variant="contained"
              disabled={!hasChanges}
              onClick={handleSave}
              startIcon={<SaveOutlinedIcon />}
              className="admin-btn-bold admin-btn-primary"
            >
              Guardar Stock
            </Button>
          </>
        }
      />

      <Box className="admin-stats-grid admin-stats-grid--spaced">
        {stats.map((stat) => (
          <article key={stat.id} className="admin-stat-card">
            <p className="admin-stat-label">{stat.label}</p>
            <strong className={`admin-stat-value ${stat.variant}`}>
              {stat.value}
            </strong>
          </article>
        ))}
      </Box>

      {/* Table */}
      <Box className="admin-products-table-card">
        <table className="admin-products-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>IMAGEN</th>
              <th>PRODUCTO / SKU</th>
              <th>CATEGORÍA</th>
              <th style={{ textAlign: 'right', width: '120px' }}>PRECIO</th>
              <th style={{ textAlign: 'center', width: '220px' }}>STOCK</th>
              <th style={{ width: '180px', textAlign: 'center' }}>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const currentStock = localStocks[product.id] ?? 0
              const isLow = currentStock <= 10 && currentStock > 0
              const isOut = currentStock === 0

              return (
                <tr key={product.id}>
                  <td>
                    <img
                      className="admin-product-image"
                      src={product.img}
                      alt={product.title}
                    />
                  </td>
                  <td>
                    <Box className="admin-product-info">
                      <strong>{product.title}</strong>
                      <span>SKU: {product.sku}</span>
                    </Box>
                  </td>
                  <td>
                    <span className="admin-category-badge">
                      {product.categoryId.toUpperCase()}
                    </span>
                  </td>
                  <td className="admin-price" style={{ textAlign: 'right' }}>
                    ${product.price.toFixed(2)}
                  </td>
                  <td>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleDecrement(product.id)}
                        sx={{ bgcolor: 'rgba(255,255,255,0.03)', '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>

                      <TextField
                        type="number"
                        value={currentStock}
                        onChange={(e) => handleStockChange(product.id, e.target.value)}
                        variant="outlined"
                        size="small"
                        slotProps={{ htmlInput: { style: { textAlign: 'center', width: '60px' }, min: 0 } }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            height: '34px',
                            borderRadius: '6px',
                          }
                        }}
                      />

                      <IconButton
                        size="small"
                        onClick={() => handleIncrement(product.id)}
                        sx={{ bgcolor: 'rgba(255,255,255,0.03)', '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {isOut ? (
                      <span className="stock-badge out">
                        SIN STOCK
                      </span>
                    ) : isLow ? (
                      <span className="stock-badge low">
                        <WarningAmberIcon fontSize="inherit" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                        BAJO STOCK ({currentStock})
                      </span>
                    ) : (
                      <span className="stock-badge normal">
                        DISPONIBLE
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Box>
    </Box>
  )
}
