function removeTrailingZeros(numStr: string): string {
  return numStr.indexOf('.') !== -1 && numStr.split('.')[1] === '00'
    ? numStr.split('.')[0]
    : numStr;
}

export function prettifyNumber(num: number): string {
  let numStr;
  if (num >= 1_000_000_000) {
    numStr = (Math.floor((num * 100) / 1_000_000_000) / 100).toString();
    return removeTrailingZeros(numStr) + ' billion';
  }
  if (num >= 1_000_000) {
    numStr = (Math.floor((num * 100) / 1_000_000) / 100).toString();
    return removeTrailingZeros(numStr) + ' million';
  }
  if (num >= 1_000) {
    numStr = (Math.floor((num * 100) / 1_000) / 100).toString();
    return removeTrailingZeros(numStr) + ' thousand';
  }
  numStr = (Math.floor(num * 100) / 100).toString();
  return removeTrailingZeros(numStr);
}

export function splitPrettifyNumber(num: number): [string, string] {
  let numStr;
  if (num >= 1_000_000_000) {
    numStr = (Math.floor((num * 100) / 1_000_000_000) / 100).toString();
    return [removeTrailingZeros(numStr), 'b'];
  }
  if (num >= 1_000_000) {
    numStr = (Math.floor((num * 100) / 1_000_000) / 100).toString();
    return [removeTrailingZeros(numStr), 'm'];
  }
  if (num >= 1_000) {
    numStr = (Math.floor((num * 100) / 1_000) / 100).toString();
    return [removeTrailingZeros(numStr), 'k'];
  }
  numStr = (Math.floor(num * 100) / 100).toString();
  return [removeTrailingZeros(numStr), ''];
}
