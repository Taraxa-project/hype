export const shortenAddress = (address: string): string => {
  if (!address) {
    return address;
  }
  return shortenString(address);
}

export const shortenString = (str: string) => {
  return str.substring(0, 6) + '...' + str.substring(str.length - 4);
}
