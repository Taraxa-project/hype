import { useAccount, useBalance } from 'wagmi';
import { useLoadingModals } from './useLoadingModals';
import { useCallback, useEffect, useState } from 'react';
import { useEscrow } from './useEscrow';
import { AddressType, NotificationType } from '../utils';
import { BigNumber } from 'ethers';
import { useHypePools } from './useHypePools';

export const useCheckDepositsAndFund = (
  amount: BigNumber,
  poolId: string,
  isCustomToken: boolean,
  tokenAddress: AddressType,
  successCallbackActivatePool: () => void,
) => {
  const { address: account } = useAccount();
  const { data: balance } = useBalance({ address: account });
  const { showNotificationModal } = useLoadingModals();
  const { depositsOf, deposit, approve } = useEscrow();
  const { activatePool } = useHypePools();

  const [isDeposited, setIsDeposited] = useState<boolean>(false);

  const checkDepositsOf = useCallback(
    async (amount: BigNumber, poolId: string) => {
      const res = await depositsOf(poolId);
      if (res && res.weiAmount?.toString() === amount.toString()) {
        setIsDeposited(true);
      } else {
        setIsDeposited(false);
      }
    },
    [depositsOf],
  );

  useEffect(() => {
    if (amount && poolId) {
      checkDepositsOf(amount, poolId);
    }
  }, [amount, poolId, checkDepositsOf]);

  const fund = async () => {
    if (balance && amount) {
      if (balance?.value.lt(amount)) {
        showNotificationModal(
          NotificationType.ERROR,
          'You don’t have enough balance in your account! Please add funds into your account in order to fund the pool!',
        );
      } else {
        setIsDeposited(false);
        if (isCustomToken) {
          await approve(amount, tokenAddress as AddressType);
        }
        await deposit(account, poolId, amount, tokenAddress);
        await checkDepositsOf(amount, poolId);
      }
    }
  };

  const activate = async () => {
    if (isDeposited) {
      await activatePool(poolId, successCallbackActivatePool);
      setIsDeposited(false);
    }
  };

  return {
    fund,
    isDeposited,
    activate,
  };
};
