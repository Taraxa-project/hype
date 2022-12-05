import { useEffect, useState } from 'react';
import { useToken } from 'wagmi';
import { HypePool } from '../models';
import { networkOptions, zeroAddress } from '../utils';

export const useTokenDecimals = (pool: HypePool) => {
  const [isCustomToken, setIsCustomToken] = useState<boolean>(false);
  const [tokenDecimals, setTokenDecimals] = useState<number>(18);
  const { data: ERC20tokenInfo } = useToken({
    address: pool?.tokenAddress as `0x${string}`,
    enabled: !!pool && isCustomToken,
  });

  useEffect(() => {
    if (pool?.network === networkOptions[0].value && pool?.tokenAddress !== zeroAddress) {
      setIsCustomToken(true);
    }
  }, [pool]);

  useEffect(() => {
    if (ERC20tokenInfo) {
      setTokenDecimals(ERC20tokenInfo.decimals || 18);
    }
  }, [ERC20tokenInfo]);

  return { isCustomToken, tokenDecimals };
};
