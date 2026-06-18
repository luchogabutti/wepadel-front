import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { registerSnackbar, unregisterSnackbar } from '../../../utils/appSnackbar';

export const SnackbarBridge = () => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    registerSnackbar(enqueueSnackbar);
    return unregisterSnackbar;
  }, [enqueueSnackbar]);

  return null;
};
