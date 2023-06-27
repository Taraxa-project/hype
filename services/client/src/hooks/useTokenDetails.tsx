import { useEffect, useState } from 'react';
import { useToken } from 'wagmi';
import { HypePool } from '../models';
import { AddressType, networkOptions, ethToken, taraToken, zeroAddress } from '../utils';

export const useTokenDetails = (pool: HypePool) => {
  const [isCustomToken, setIsCustomToken] = useState<boolean>(false);
  const [tokenDecimals, setTokenDecimals] = useState<number>(18);
  const [tokenSymbol, setTokenSymbol] = useState<string>(taraToken);
  const { data: ERC20tokenInfo } = useToken({
    address: pool?.tokenAddress as AddressType,
    chainId: pool?.network,
    enabled: !!pool && isCustomToken,
  });

  useEffect(() => {
    if (pool) {
      if (pool.network === networkOptions[0].value && pool.tokenAddress === zeroAddress) {
        setTokenSymbol(ethToken);
      } else if (pool.network !== networkOptions[0].value && pool.tokenAddress === zeroAddress) {
        setTokenSymbol(taraToken);
      } else {
        setIsCustomToken(true);
      }
    }
  }, [pool]);

  useEffect(() => {
    if (ERC20tokenInfo) {
      setTokenDecimals(ERC20tokenInfo.decimals);
      setTokenSymbol(ERC20tokenInfo.symbol);
    }
  }, [ERC20tokenInfo]);

  return { isCustomToken, tokenDecimals, tokenSymbol };
};
