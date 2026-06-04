import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  IconButton,
  TextField,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { AdminSectionLayout } from '../../shared/AdminSectionLayout/AdminSectionLayout'
import { AdminStatsGrid } from '../../shared/AdminStatsGrid/AdminStatsGrid'
import { AdminTableCard } from '../../shared/AdminTableCard/AdminTableCard'
import '../../styles.scss'
import './styles.scss'

export const AdminStockSection = ({
  title,
  subtitle,
  products = [],
  onRequestSaveStock,
}) => {
  const [localStocks, setLocalStocks] = useState(() => {
    const stocksMap = {}
    products.forEach((p) => {
      stocksMap[p.id] = p.stock
    })
    return stocksMap
  })

  useEffect(() => {
    const stocksMap = {}
    products.forEach((p) => {
      stocksMap[p.id] = p.stock
    })
    setLocalStocks(stocksMap)
  }, [products])

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
    onRequestSaveStock(updatedProducts)
  }

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
    <AdminSectionLayout
      className="admin-stock-section"
      title={title}
      subtitle={subtitle}
      actions={
        <>
          {hasChanges && (
            <Button
              variant="outlined"
              sx={{ color: 'primary.light', borderColor: 'primary.light' }}
              onClick={handleReset}
              startIcon={<SettingsBackupRestoreIcon />}
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
    >
      <AdminStatsGrid stats={stats} />

      <AdminTableCard>
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
                    <Box className="admin-stock-stepper">
                      <IconButton
                        size="small"
                        onClick={() => handleDecrement(product.id)}
                        className="admin-stock-stepper-btn"
                        aria-label="Reducir stock"
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>

                      <TextField
                        type="number"
                        value={currentStock}
                        onChange={(e) => handleStockChange(product.id, e.target.value)}
                        variant="outlined"
                        size="small"
                        className="admin-stock-stepper-input"
                        slotProps={{ htmlInput: { min: 0 } }}
                      />

                      <IconButton
                        size="small"
                        onClick={() => handleIncrement(product.id)}
                        className="admin-stock-stepper-btn"
                        aria-label="Aumentar stock"
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
                        <WarningAmberIcon fontSize="inherit" className="stock-badge__icon" />
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
      </AdminTableCard>
    </AdminSectionLayout>
  )
}
