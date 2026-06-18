import { Box, Typography } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './styles.scss';

export const TablePaginationFooter = ({
  label,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = '',
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const showControls = Boolean(onPageChange);

  return (
    <Box className={`table-pagination-footer ${className}`.trim()}>
      <Typography variant="body2" className="table-pagination-footer__label">
        {label}
      </Typography>

      {showControls && (
        <Box className="table-pagination-footer__controls">
          <button
            type="button"
            aria-label="Página anterior"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <KeyboardArrowLeftIcon />
          </button>

          {pages.map((page) => (
            <button
              key={page}
              type="button"
              className={page === currentPage ? 'active' : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            aria-label="Página siguiente"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <KeyboardArrowRightIcon />
          </button>
        </Box>
      )}
    </Box>
  );
};
