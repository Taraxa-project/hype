import { ethers, BigNumber } from 'ethers';

export const weiToEth = (val: ethers.BigNumberish) => ethers.utils.formatUnits(val, 'ether');
export const formatEth = (val: ethers.BigNumberish) => ethers.utils.commify(val.toString());
export const roundEth = (val: string) => (+val).toFixed(4);
export const transformFromWei = (amount: number, tokenDecimals: number) => {
  if (!amount || !tokenDecimals) {
    return;
  }
  return BigNumber.from(amount).div(BigNumber.from(10).pow(tokenDecimals))?.toString();
};
