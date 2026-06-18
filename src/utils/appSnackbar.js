let enqueueSnackbarRef = null;

export const registerSnackbar = (enqueueSnackbar) => {
  enqueueSnackbarRef = enqueueSnackbar;
};

export const unregisterSnackbar = () => {
  enqueueSnackbarRef = null;
};

export const notifySuccess = (message) => {
  enqueueSnackbarRef?.(message, { variant: 'success' });
};

export const notifyError = (message) => {
  enqueueSnackbarRef?.(message, { variant: 'error' });
};
