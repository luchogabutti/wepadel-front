import { Box, Typography } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './styles.scss';

export const buildShowingLabel = (visibleCount, totalCount, entity = 'productos') => {
  if (totalCount === 0) {
    return `Mostrando 0 de 0 ${entity}`;
  }

  const shown = Math.max(0, Math.min(visibleCount, totalCount));

  return `Mostrando 1-${shown} de ${totalCount} ${entity}`;
};

export const TablePaginationFooter = ({
  label,
  currentPage = 1,
  totalPages = 3,
  className = '',
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Box className={`table-pagination-footer ${className}`.trim()}>
      <Typography variant="body2" className="table-pagination-footer__label">
        {label}
      </Typography>

      <Box className="table-pagination-footer__controls">
        <button type="button" aria-label="Página anterior">
          <KeyboardArrowLeftIcon />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={page === currentPage ? 'active' : undefined}
          >
            {page}
          </button>
        ))}

        <button type="button" aria-label="Página siguiente">
          <KeyboardArrowRightIcon />
        </button>
      </Box>
    </Box>
  );
};
