import { useCallback } from 'react';
import { useSnackbar } from 'notistack';

export const useAppSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notifySuccess = useCallback(
    (message) => enqueueSnackbar(message, { variant: 'success' }),
    [enqueueSnackbar]
  );

  const notifyError = useCallback(
    (message) => enqueueSnackbar(message, { variant: 'error' }),
    [enqueueSnackbar]
  );

  return { notifySuccess, notifyError };
};
