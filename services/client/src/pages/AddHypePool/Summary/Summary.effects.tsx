import { BigNumber, ethers } from 'ethers';
import { HypePoolRewardForm } from '../RewardForm';
import { useAuth, useCheckDepositsAndFund } from '../../../hooks';
import { useAccount } from 'wagmi';
import { AddressType } from '../../../utils';

export const useSummaryEffects = (
  createdPoolIndex: string,
  successCallbackActivatePool: () => void,
  rewards: HypePoolRewardForm,
  isCustomToken: boolean,
) => {
  const { authenticated } = useAuth();
  const { address: account } = useAccount();
  const amount: BigNumber =
    rewards.cap && rewards.tokenDecimals
      ? ethers.utils.parseUnits(rewards.cap.toString().replace(',', '.'), rewards.tokenDecimals)
      : BigNumber.from(0);

  const { fund, isDeposited, activate } = useCheckDepositsAndFund(
    amount,
    createdPoolIndex,
    isCustomToken,
    rewards?.tokenAddress as AddressType,
    successCallbackActivatePool,
  );

  return {
    fund,
    activate,
    account,
    authenticated,
    isDeposited,
  };
};
