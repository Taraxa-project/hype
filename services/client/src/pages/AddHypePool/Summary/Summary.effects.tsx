import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { HypePoolRewardForm } from '../RewardForm';
import { useAuth, useLoadingModals, useEscrow, useHypePools, DepositsOf } from '../../../hooks';
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
  const [depositsData, setDepositsData] = useState<DepositsOf>();

  const [amount, setAmount] = useState<BigNumber>(BigNumber.from(0));
  const { depositsOf, deposit, approve } = useEscrow();
  const { activatePool } = useHypePools();
  const { data: balance } = useBalance({ address: account });
  const { showNotificationModal } = useLoadingModals();

  useEffect(() => {
    if (amount && createdPoolIndex && depositsData) {
      const { weiAmount, poolId } = depositsData;
      if (
        weiAmount?.toString() === amount.toString() &&
        poolId?.toString() === createdPoolIndex.toString()
      ) {
        setIsDeposited(true);
      }
    }
  }, [depositsData, amount, createdPoolIndex]);

  useEffect(() => {
    if (rewards.tokenDecimals) {
      const amount = ethers.utils.parseUnits(
        rewards.cap.toString().replace(',', '.'),
        rewards.tokenDecimals,
      );
      setAmount(amount);
    }
  }, [rewards]);

  const fund = async () => {
    if (balance && amount) {
      if (balance?.value.lt(amount)) {
        showNotificationModal(
          NotificationType.ERROR,
          'You don’t have enough balance in your account! Please add funds into your account in order to fund the pool!',
        );
      } else {
        if (isCustomToken) {
          await approve(account, createdPoolIndex, amount, rewards.tokenAddress as AddressType);
          const depositData = await depositsOf(createdPoolIndex);
          setDepositsData(depositData);
        } else {
          await deposit(account, createdPoolIndex, amount, rewards.tokenAddress);
          const depositData = await depositsOf(createdPoolIndex);
          setDepositsData(depositData);
        }
      }
    }
  };

  const activate = async () => {
    if (isDeposited) {
      await activatePool(createdPoolIndex, successCallbackActivatePool);
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
