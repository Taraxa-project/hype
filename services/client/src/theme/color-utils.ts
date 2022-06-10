export const LightenColor = (color: string, percent?: number): string => {

  const formmatedPercent = percent || 10;

  if (color) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * formmatedPercent);
    const R = (num >> 16) + amt;
    const B = ((num >> 8) & 0x00ff) + amt;
    const G = (num & 0x0000ff) + amt;

    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
        (G < 255 ? (G < 1 ? 0 : G) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  return formmatedPercent > 0 ? '#ffffff' : '#000000';
};
