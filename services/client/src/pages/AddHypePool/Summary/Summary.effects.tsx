import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { HypePoolRewardForm } from '../RewardForm';
import {
  useAuth,
  useContractERC20Approve,
  useContractActivatePool,
  useContractEscrowDeposit,
  useContractEscrowGetDepositsOf,
  useLoadingModals,
} from '../../../hooks';
import { AddressType, NotificationType } from '../../../utils';

export const useSummaryEffects = (
  createdPoolIndex: string,
  successCallbackActivatePool: () => void,
  rewards: HypePoolRewardForm,
  isCustomToken: boolean,
) => {
  const { address: account } = useAccount();
  const { authenticated } = useAuth();

  const [enableActivate, setEnableActivate] = useState<boolean>(false);
  const [enableApprove, setEnableApprove] = useState<boolean>(false);
  const [enableDeposit, setEnableDeposit] = useState<boolean>(false);
  const [isDeposited, setIsDeposited] = useState<boolean>(false);
  const [hasDeposited, setHasDeposited] = useState<boolean>(false);

  const [amount, setAmount] = useState<BigNumber>(BigNumber.from(0));
  const { data: depositsOf } = useContractEscrowGetDepositsOf(createdPoolIndex, hasDeposited);
  const { data: balance } = useBalance({ address: account });
  const { showNotificationModal } = useLoadingModals();

  const successCallbackDeposit = (): void => {
    setHasDeposited(true);
  };
  useContractActivatePool(createdPoolIndex, enableActivate, successCallbackActivatePool);
  useContractERC20Approve(
    account,
    createdPoolIndex,
    amount,
    rewards.tokenAddress as AddressType,
    enableApprove,
    successCallbackDeposit,
  );
  useContractEscrowDeposit(
    account,
    createdPoolIndex,
    amount,
    rewards.tokenAddress,
    enableDeposit,
    successCallbackDeposit,
  );

  useEffect(() => {
    if (depositsOf && amount) {
      if (
        depositsOf?.weiAmount?.toString() === amount.toString() &&
        depositsOf?.poolId?.toString() === createdPoolIndex.toString()
      ) {
        setIsDeposited(true);
      }
    }
  }, [depositsOf, amount, createdPoolIndex]);

  useEffect(() => {
    if (rewards.tokenDecimals) {
      const amount = BigNumber.from(rewards.cap).mul(BigNumber.from(10).pow(rewards.tokenDecimals));
      setAmount(amount);
    }
  }, [rewards]);

  const fund = () => {
    if (balance && amount) {
      if (balance?.value.lt(amount)) {
        showNotificationModal(
          NotificationType.ERROR,
          'You don`t have enough balance in your account! Please add funds into your account in order to fund the pool!',
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

  return {
    fund,
    activate,
    account,
    authenticated,
    isDeposited,
  };
};
