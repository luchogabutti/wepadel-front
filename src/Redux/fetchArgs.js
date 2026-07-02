export const normalizeUserFetchArg = (arg) => {
  if (typeof arg === 'object' && arg !== null) {
    return {
      usuarioId: arg.usuarioId,
      forceRefresh: Boolean(arg.forceRefresh),
    };
  }

  return { usuarioId: arg, forceRefresh: false };
};
