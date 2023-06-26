import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { useAccount, useBalance } from 'wagmi';
import { HYPEPOOL_QUERIES } from '../../api/pools/query-collector';
import {
  useAuth,
  useContractActivatePool,
  useContractERC20Approve,
  useContractEscrowDeposit,
  useContractEscrowGetDepositsOf,
  useLoadingModals,
  useTokenDecimals,
} from '../../hooks';
import { HypePool } from '../../models';
import { AddressType, NotificationType } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useGetPoolStats } from '../../api/pools/useGetPoolStats';
import { useGetPoolLeaderboard } from '../../api/pools/useGetPoolLeaderboard';

export const usePoolDetailsEffects = (poolId: string) => {
  const { authenticated } = useAuth();
  const { address: account } = useAccount();
  const [pool, setPool] = useState<HypePool>();
  const { isCustomToken, tokenDecimals, tokenSymbol } = useTokenDecimals(pool);
  const [{ data: hypePoolData }] = useQuery({
    query: HYPEPOOL_QUERIES.poolQuery,
    variables: { id: poolId },
    pause: poolId === undefined || poolId === null,
  });
  let navigate = useNavigate();

  const [enableActivate, setEnableActivate] = useState<boolean>(false);
  const [enableApprove, setEnableApprove] = useState<boolean>(false);
  const [enableDeposit, setEnableDeposit] = useState<boolean>(false);
  const [isDeposited, setIsDeposited] = useState<boolean>(false);
  const [hasDeposited, setHasDeposited] = useState<boolean>(true);

  const [amount, setAmount] = useState<BigNumber>(BigNumber.from(0));
  const { data: depositsOf } = useContractEscrowGetDepositsOf(poolId, hasDeposited, isCustomToken);
  const { data: balance } = useBalance({ address: account });
  const { showNotificationModal } = useLoadingModals();
  const { data: poolStats } = useGetPoolStats(poolId);
  const { data: leaderboard } = useGetPoolLeaderboard(poolId);

  const successCallbackDeposit = (): void => {
    setHasDeposited(true);
  };

  const successCallbackActivatePool = (): void => {
    setPool({
      ...pool,
      active: true,
    });
  };

  useContractActivatePool(poolId, enableActivate, successCallbackActivatePool, () => {
    setEnableActivate(false);
  });
  useContractERC20Approve(
    account,
    poolId,
    amount,
    pool?.tokenAddress as AddressType,
    enableApprove,
    isCustomToken,
    successCallbackDeposit,
  );
  useContractEscrowDeposit(
    account,
    poolId,
    amount,
    pool?.tokenAddress,
    enableDeposit,
    isCustomToken,
    successCallbackDeposit,
    () => {
      setEnableDeposit(false);
    },
  );

  useEffect(() => {
    if (depositsOf && pool) {
      if (
        depositsOf?.weiAmount?.toString() === pool.cap.toString() &&
        depositsOf?.poolId?.toString() === poolId.toString()
      ) {
        setIsDeposited(true);
      }
    }
  }, [depositsOf, pool, poolId]);

  useEffect(() => {
    if (hypePoolData) {
      setPool(hypePoolData?.hypePool);
    }
  }, [hypePoolData]);

  useEffect(() => {
    if (pool?.cap) {
      const amount = BigNumber.from(pool?.cap || 0);
      setAmount(amount);
    }
  }, [pool]);

  const fund = () => {
    setHasDeposited(false);
    if (balance && pool?.cap) {
      if (balance?.value.lt(BigNumber.from(pool?.cap))) {
        showNotificationModal(
          NotificationType.ERROR,
          'You don’t have enough balance in your account! Please add funds into your account in order to fund the pool!',
        );
      } else {
        if (isCustomToken) {
          setEnableApprove(true);
        } else {
          setEnableDeposit(true);
        }
      }
    }
  };

  const activate = () => {
    if (isDeposited) {
      setEnableActivate(true);
    }
  };

  const onParticipate = () => {
    navigate(`/participate`);
  };

  return {
    ...pool,
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
