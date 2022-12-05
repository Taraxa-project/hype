import { BigNumber } from 'ethers';

export const transformFromWei = (amount: number, tokenDecimals: number) => {
  if (!amount || !tokenDecimals) {
    return;
  }
  return BigNumber.from(amount).div(BigNumber.from(10).pow(tokenDecimals))?.toString();
};
