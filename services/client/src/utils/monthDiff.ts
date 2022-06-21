export const monthDiff = (dateFrom: Date, dateTo: Date): number => {
  if (!dateFrom || !dateTo) return 0;
  return (
    dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  );
};
