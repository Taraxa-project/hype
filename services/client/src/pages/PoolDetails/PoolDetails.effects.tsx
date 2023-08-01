import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { useAccount, useBalance } from 'wagmi';
import { HYPEPOOL_QUERIES } from '../../api/pools/query-collector';
import { useAuth, useLoadingModals, useEscrow, useTokenDetails, useHypePools } from '../../hooks';
import { HypePool } from '../../models';
import { AddressType, NotificationType } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useGetPoolStats } from '../../api/pools/useGetPoolStats';
import { useGetPoolLeaderboard } from '../../api/pools/useGetPoolLeaderboard';

export const usePoolDetailsEffects = (poolId: string) => {
  const { authenticated } = useAuth();
  const { address: account } = useAccount();
  const [pool, setPool] = useState<HypePool>();
  const { isCustomToken, tokenDecimals, tokenSymbol } = useTokenDetails(pool);
  const [{ data: hypePoolData, fetching: fetchingPoolData }] = useQuery({
    query: HYPEPOOL_QUERIES.poolQuery,
    variables: { id: poolId },
    pause: poolId === undefined || poolId === null,
  });
  let navigate = useNavigate();

  const [isDeposited, setIsDeposited] = useState<boolean>(false);
  const { data: balance } = useBalance({ address: account });
  const { showNotificationModal } = useLoadingModals();
  const { data: poolStats } = useGetPoolStats(poolId);
  const { data: leaderboard } = useGetPoolLeaderboard(poolId);
  const { depositsOf, deposit, approve } = useEscrow();
  const { activatePool } = useHypePools();

  const amount: BigNumber = BigNumber.from(pool?.cap || 0);
  const successCallbackActivatePool = (): void => {
    setPool({
      ...pool,
      active: true,
    });
  };

  useEffect(() => {
    if (amount && poolId) {
      (async () => {
        await checkDepositsOf(amount, poolId);
      })();
    }
  }, [amount, poolId]);

  useEffect(() => {
    if (hypePoolData) {
      setPool(hypePoolData?.hypePool);
    }
  }, [hypePoolData]);

  const checkDepositsOf = async (amount: BigNumber, poolId: string) => {
    const { weiAmount, poolId: id } = await depositsOf(poolId);
    if (weiAmount?.toString() === amount.toString() && id?.toString() === poolId.toString()) {
      setIsDeposited(true);
    }
  };

  const fund = async () => {
    if (balance && amount) {
      if (balance?.value.lt(BigNumber.from(amount))) {
        showNotificationModal(
          NotificationType.ERROR,
          'You don’t have enough balance in your account! Please add funds into your account in order to fund the pool!',
        );
      } else {
        if (isCustomToken) {
          await approve(amount, pool?.tokenAddress as AddressType);
        }
        await deposit(account, poolId, amount, pool?.tokenAddress as AddressType);
        await checkDepositsOf(amount, poolId);
      }
    }
  };

  const activate = async () => {
    if (isDeposited) {
      await activatePool(poolId, successCallbackActivatePool);
    }
  };

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
  };
};
