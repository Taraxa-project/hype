export function prettifyNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + ' billion';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + ' million';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + ' thousand';
  }
  return num.toFixed(1);
}

export function splitPrettifyNumber(num: number): [string, string] {
  if (num >= 1_000_000_000) {
    return [(num / 1_000_000_000).toFixed(1), 'b'];
  }
  if (num >= 1_000_000) {
    return [(num / 1_000_000).toFixed(1), 'm'];
  }
  if (num >= 1_000) {
    return [(num / 1_000).toFixed(1), 'k'];
  }
  return [num.toFixed(1), ''];
}
