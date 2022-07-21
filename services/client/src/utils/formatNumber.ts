export const formatNumber = (value: number) => {
  if (!value) {
    return;
  }
  return Number(value).toLocaleString('en-US');
};
