export const buildShowingLabel = (rangeStart, rangeEnd, totalCount, entity = 'productos') => {
  if (totalCount === 0) {
    return `Mostrando 0 de 0 ${entity}`;
  }

  return `Mostrando ${rangeStart}-${rangeEnd} de ${totalCount} ${entity}`;
};
