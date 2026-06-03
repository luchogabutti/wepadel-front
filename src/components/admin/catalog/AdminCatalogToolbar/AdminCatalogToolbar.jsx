import { Box, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PageHeader } from '../../../layout/PageHeader';
import '../../styles.scss';

export const AdminCatalogToolbar = ({
  title,
  subtitle,
  searchTerm,
  onSearchChange,
  onCreateProduct,
}) => {
  return (
    <Box className="admin-catalog-toolbar">
      <PageHeader
        variant="profile"
        title={title}
        subtitle={subtitle}
        alignActions="center"
        actions={
          <>
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

            <Button
              variant="contained"
              onClick={onCreateProduct}
              className="admin-btn-bold admin-btn-primary"
            >
              + Nuevo producto
            </Button>
          </>
        }
      />
    </Box>
  );
};
