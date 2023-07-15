import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { HypePoolRewardForm } from '../RewardForm';
import { useAuth, useLoadingModals, useEscrow, useHypePools } from '../../../hooks';
import { AddressType, NotificationType } from '../../../utils';

export const useSummaryEffects = (
  createdPoolIndex: string,
  successCallbackActivatePool: () => void,
  rewards: HypePoolRewardForm,
  isCustomToken: boolean,
) => {
  const { address: account } = useAccount();
  const { authenticated } = useAuth();

  const [isDeposited, setIsDeposited] = useState<boolean>(false);

  const [amount, setAmount] = useState<BigNumber>(BigNumber.from(0));
  const { depositsOf, deposit, approve } = useEscrow();
  const { activatePool } = useHypePools();
  const { data: balance } = useBalance({ address: account });
  const { showNotificationModal } = useLoadingModals();

  useEffect(() => {
    if (amount && createdPoolIndex) {
      (async () => {
        const { weiAmount, poolId } = await depositsOf(createdPoolIndex);
        if (
          weiAmount?.toString() === amount.toString() &&
          poolId?.toString() === createdPoolIndex.toString()
        ) {
          setIsDeposited(true);
        }
      })();
    }
  }, [amount, createdPoolIndex]);

  useEffect(() => {
    if (rewards.tokenDecimals) {
      const amount = ethers.utils.parseUnits(
        rewards.cap.toString().replace(',', '.'),
        rewards.tokenDecimals,
      );
      setAmount(amount);
    }
  }, [rewards]);

  const fund = () => {
    if (balance && amount) {
      if (balance?.value.lt(amount)) {
        showNotificationModal(
          NotificationType.ERROR,
          'You don’t have enough balance in your account! Please add funds into your account in order to fund the pool!',
        );
      } else {
        if (isCustomToken) {
          approve(account, createdPoolIndex, amount, rewards.tokenAddress as AddressType);
        } else {
          deposit(account, createdPoolIndex, amount, rewards.tokenAddress);
        }
      }
    }
  };

  const activate = () => {
    if (isDeposited) {
      activatePool(createdPoolIndex, successCallbackActivatePool);
    }
  };

  return {
    fund,
    activate,
    account,
    authenticated,
    isDeposited,
  };
};
