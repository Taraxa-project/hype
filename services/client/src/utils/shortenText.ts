export const shortenText = (text: string, visibleLength = 120): string => {
  if (!text || text.length <= visibleLength) {
    return text;
  }
  return text.substring(0, visibleLength).replace(/\w+?$/, '').replace(/\s+$/, '') + '...';
};
