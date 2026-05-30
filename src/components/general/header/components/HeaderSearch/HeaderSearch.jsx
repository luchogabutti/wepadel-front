import { Box, InputBase, alpha } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export function HeaderSearch() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        borderRadius: 1,
        backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
        },
        width: '100%',
      }}
    >
      <Box sx={{ padding: '0 16px', display: 'flex', alignItems: 'center' }}>
        <SearchIcon />
      </Box>
      <InputBase
        placeholder="Buscar..."
        sx={{
          color: 'inherit',
          width: '100%',
          '& .MuiInputBase-input': {
            padding: 1,
            width: { xs: '100%', md: '20ch' }, 
          },
        }}
      />
    </Box>
  );
}
