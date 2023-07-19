export const monthDiff = (dateFrom: Date, dateTo: Date): number => {
  if (!dateFrom || !dateTo) return 0;
  return (
    new Date(dateTo).getMonth() -
    new Date(dateFrom).getMonth() +
    12 * (new Date(dateTo).getFullYear() - new Date(dateFrom).getFullYear())
  );
};
