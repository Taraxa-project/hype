import { ethers } from 'ethers';

export const weiToEth = (val: ethers.BigNumberish) => ethers.utils.formatUnits(val, 'ether');
export const formatEth = (val: ethers.BigNumberish) => ethers.utils.commify(val.toString());
export const roundEth = (val: string) => (+val).toFixed(4);
export const transformFromWei = (amount: number | string, tokenDecimals: number) => {
  if (!amount || !tokenDecimals) {
    return;
  }
  return ethers.utils.formatUnits(amount.toString(), tokenDecimals)?.toString();
};
