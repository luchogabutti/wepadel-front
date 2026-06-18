import { useState, useMemo, useCallback } from 'react';

export const usePagination = (items, pageSize = 10) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, safePage, pageSize]);

  const rangeStart = items.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const rangeEnd = items.length === 0 ? 0 : Math.min(safePage * pageSize, items.length);

  const handlePageChange = useCallback(
    (nextPage) => {
      setPage(Math.min(Math.max(1, nextPage), totalPages));
    },
    [totalPages]
  );

  return {
    page: safePage,
    setPage: handlePageChange,
    totalPages,
    paginatedItems,
    rangeStart,
    rangeEnd,
    totalCount: items.length,
  };
};
