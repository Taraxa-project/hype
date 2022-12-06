import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useGetPoolDetails } from '../../api/pools/useGetPoolDetails';
import {
  useAuth,
  useContractActivatePool,
  useContractERC20Approve,
  useContractEscrowDeposit,
  useContractEscrowGetDepositsOf,
  useTokenDecimals,
} from '../../hooks';
import { HypePool } from '../../models';

export const usePoolDetailsEffects = (poolId: number) => {
  const { authenticated } = useAuth();
  const { address: account } = useAccount();
  const [pool, setPool] = useState<HypePool>();
  const { isCustomToken, tokenDecimals } = useTokenDecimals(pool);
  const result = useGetPoolDetails(poolId);
  const [enableActivate, setEnableActivate] = useState<boolean>(false);
  const [enableApprove, setEnableApprove] = useState<boolean>(false);
  const [enableDeposit, setEnableDeposit] = useState<boolean>(false);
  const [isDeposited, setIsDeposited] = useState<boolean>(false);
  const { data: depositsOf } = useContractEscrowGetDepositsOf(BigNumber.from(poolId), true);

  const successCallbackDeposit = (): void => {
    setIsDeposited(true);
  };

  const successCallbackActivatePool = (): void => {
    setPool({
      ...pool,
      active: true,
    });
  };

  useContractActivatePool(BigNumber.from(poolId), enableActivate, successCallbackActivatePool);
  useContractERC20Approve(
    account,
    BigNumber.from(poolId),
    BigNumber.from(pool?.cap || 0),
    pool?.tokenAddress,
    enableApprove,
    successCallbackDeposit,
  );
  useContractEscrowDeposit(
    account,
    BigNumber.from(poolId),
    BigNumber.from(pool?.cap || 0),
    pool?.tokenAddress,
    enableDeposit,
    successCallbackDeposit,
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
    result.then((response) => {
      if (response?.data?.hypePool) {
        setPool(response?.data?.hypePool);
      }
    });
  }, [result]);

  const fund = () => {
    if (isCustomToken) {
      setEnableApprove(true);
    } else {
      setEnableDeposit(true);
    }
  };

  const activate = () => {
    if (isDeposited) {
      setEnableActivate(true);
    }
  };

  return {
    ...pool,
    tokenDecimals,
    isDeposited,
    authenticated,
    fund,
    activate,
  };
};
