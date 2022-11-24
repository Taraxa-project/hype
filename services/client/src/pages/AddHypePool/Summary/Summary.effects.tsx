import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import useContractActivatePool from '../../../hooks/useContractActivatePool';
import useAuth from '../../../hooks/useAuth';
import { useAccount } from 'wagmi';
import { HypePoolRewardForm } from '../RewardForm';
import useContractERC20Approve from '../../../hooks/useContractERC20Approve';
import useContractEscrowDeposit from '../../../hooks/useContractEscrowDeposit';

export const useSummaryEffects = (
  createdPoolIndex: BigNumber,
  successCallbackActivatePool: () => void,
  rewards: HypePoolRewardForm,
  isCustomToken: boolean,
) => {
  const { address: account } = useAccount();
  const { authenticated } = useAuth();
  const [enableActivate, setEnableActivate] = useState<boolean>(false);
  const [enableApprove, setEnableApprove] = useState<boolean>(false);
  const [enableDeposit, setEnableDeposit] = useState<boolean>(false);

  const [amount, setAmount] = useState<BigNumber>(BigNumber.from(0));

  const successCallbackDeposit = (): void => {
    setEnableActivate(true);
  };
  useContractActivatePool(createdPoolIndex, enableActivate, successCallbackActivatePool);
  useContractERC20Approve(
    account,
    createdPoolIndex,
    amount,
    rewards.tokenAddress,
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
    if (rewards.tokenDecimals) {
      const amount = BigNumber.from(rewards.cap).mul(BigNumber.from(10).pow(rewards.tokenDecimals));
      setAmount(amount);
    }
  }, [rewards]);

  const fundAndActivate = () => {
    console.log('Fund & Activate');
    if (isCustomToken) {
      setEnableApprove(true);
    } else {
      setEnableDeposit(true);
    }
  };

  return {
    fundAndActivate,
    account,
    authenticated,
  };
};
