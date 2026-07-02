import { Fragment } from 'react';
import { Stack, Typography } from '@mui/material';
import { LoadingState } from '../../../general/LoadingState/LoadingState';
import { ApiErrorState } from '../../../general/ApiErrorState/ApiErrorState';
import { PageHeader } from '../../../layout/PageHeader';
import { TablePaginationFooter } from '../../../general/TablePaginationFooter/TablePaginationFooter';
import { buildShowingLabel } from '../../../../utils/paginationLabels';
import { usePagination } from '../../../../hooks/usePagination';

export const OrdersListSection = ({
  title,
  subtitle,
  headerVariant = 'profile',
  orders = [],
  loading = false,
  error = null,
  loadingMessage = 'Cargando pedidos...',
  errorFallback = 'No se pudieron cargar los pedidos.',
  emptyMessage = 'No hay pedidos registrados.',
  paginationLabel = 'pedidos',
  pageSize = 5,
  onRetry,
  renderOrder,
}) => {
  const { paginatedItems, page, setPage, totalPages, rangeStart, rangeEnd, totalCount } =
    usePagination(orders, pageSize);

  if (loading) {
    return (
      <>
        <PageHeader variant={headerVariant} title={title} subtitle={subtitle} />
        <LoadingState message={loadingMessage} />
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageHeader variant={headerVariant} title={title} subtitle={subtitle} />
        <ApiErrorState error={error} fallback={errorFallback} onRetry={onRetry} />
      </>
    );
  }

  return (
    <>
      <PageHeader variant={headerVariant} title={title} subtitle={subtitle} />

      {orders.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ py: 4 }}>
          {emptyMessage}
        </Typography>
      ) : (
        <>
          <Stack spacing={3}>
            {paginatedItems.map((order) => (
              <Fragment key={order.id}>{renderOrder(order)}</Fragment>
            ))}
          </Stack>

          <TablePaginationFooter
            className="table-pagination-footer--orders"
            label={buildShowingLabel(rangeStart, rangeEnd, totalCount, paginationLabel)}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </>
  );
};
