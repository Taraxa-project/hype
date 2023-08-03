import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { useAccount, useSigner } from 'wagmi';
import { HYPEPOOL_QUERIES } from '../../api/pools/query-collector';
import { HypePool, PoolStatus } from '../../models';
import { useAuth, useTokenDetails, useCheckDepositsAndFund } from '../../hooks';
import { AddressType } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useGetPoolStats } from '../../api/pools/useGetPoolStats';
import { useGetPoolLeaderboard } from '../../api/pools/useGetPoolLeaderboard';

export const usePoolDetailsEffects = (poolId: string) => {
  const { authenticated } = useAuth();
  const { address: account } = useAccount();
  const { data: signer } = useSigner();

  const [{ data: hypePoolData, fetching: fetchingPoolData }] = useQuery({
    query: HYPEPOOL_QUERIES.poolQuery,
    variables: { id: poolId },
    pause: poolId === undefined || poolId === null,
  });
  let navigate = useNavigate();
  const [pool, setPool] = useState<HypePool>();

  const { isCustomToken, tokenDecimals, tokenSymbol } = useTokenDetails(pool);

  const { data: poolStats } = useGetPoolStats(poolId);
  const { data: leaderboard } = useGetPoolLeaderboard(poolId);
  const amount: BigNumber = BigNumber.from(pool?.cap || 0);
  const successCallbackActivatePool = (): void => {
    setPool({
      ...pool,
      status: PoolStatus.STARTED,
    });
  };

  useEffect(() => {
    if (hypePoolData) {
      setPool(hypePoolData?.hypePool);
    }
  }, [hypePoolData]);

  const { fund, isDeposited, activate } = useCheckDepositsAndFund(
    amount,
    poolId,
    isCustomToken,
    pool?.tokenAddress as AddressType,
    successCallbackActivatePool,
  );

  const onParticipate = () => {
    navigate(`/participate`);
  };

  return {
    pool,
    fetchingPoolData,
    tokenDecimals,
    tokenSymbol,
    isDeposited,
    authenticated,
    fund,
    activate,
    account,
    onParticipate,
    poolStats,
    leaderboard,
    signer,
  };
};
