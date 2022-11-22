import { BigNumber } from 'ethers';
import { useState } from 'react';
import useContractActivatePool from '../../../hooks/useContractActivatePool';
import useAuth from '../../../hooks/useAuth';
import { useAccount } from 'wagmi';
import { HypePoolRewardForm } from '../RewardForm';
import useContractERC20Approve from '../../../hooks/useContractERC20Approve';

export const useSummaryEffects = (
  createdPoolIndex: BigNumber,
  successCallbackActivatePool: () => void,
  rewards: HypePoolRewardForm,
) => {
  const { address: account } = useAccount();
  const { authenticated } = useAuth();
  const [enableActivate, setEnableActivate] = useState<boolean>(false);
  const [enableApprove, setEnableApprove] = useState<boolean>(false);
  const successCallbackDeposit = (): void => {
    setEnableActivate(true);
  };
  useContractActivatePool(createdPoolIndex, enableActivate, successCallbackActivatePool);
  useContractERC20Approve(
    account,
    +createdPoolIndex.toString(),
    rewards.cap,
    rewards.tokenAddress,
    enableApprove,
    successCallbackDeposit,
  );

  const fundAndActivate = () => {
    console.log('Fund & Activate');
    setEnableApprove(true);
  };

  return {
    fundAndActivate,
    account,
    authenticated,
  };
};
