import { Box, Typography, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../styles.scss';

export const AdminCatalogToolbar = ({
  eyebrow,
  title,
  searchTerm,
  onSearchChange,
  onCreateProduct,
}) => {
  return (
    <header className="admin-catalog-toolbar">
      <Box className="admin-section-header-copy">
        {eyebrow && <Typography component="span" className="admin-section-eyebrow">{eyebrow}</Typography>}
        <Typography component="h1" className="admin-section-title admin-section-title--hero">
          {title}
        </Typography>
      </Box>

      <Box className="admin-catalog-toolbar__actions">
        <TextField
          size="small"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="admin-search-field"
          slotProps={{
            input: {
              startAdornment: <SearchIcon className="admin-search-field__icon" />,
            },
          }}
        />

        <Button variant="contained" onClick={onCreateProduct} className="admin-btn-bold admin-btn-primary">
          + Nuevo producto
        </Button>
      </Box>
    </header>
  );
};
