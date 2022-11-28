import { useEffect, useState } from 'react';
import { useGetPoolDetails } from '../../api/pools/useGetPoolDetails';
import { useTokenDecimals } from '../../hooks';
import { HypePool } from '../../models';

export const usePoolDetailsEffects = (poolId: number) => {
  const result = useGetPoolDetails(poolId);
  const [pool, setPool] = useState<HypePool>();
  const { tokenDecimals } = useTokenDecimals(pool);

  useEffect(() => {
    result.then((response) => {
      if (response?.data?.hypePool) {
        setPool(response?.data?.hypePool);
      }
    });
  }, [result]);

  return {
    ...pool,
    tokenDecimals,
  };
};
