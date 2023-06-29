import { useEffect, useState } from 'react';
import { useGetMyRewards } from '../../api/rewards/useGetUserRewards';
import { getERC20TokenName } from '../../utils/tokens';
import { useRequestRewards } from '../../api/rewards/useRequestRewards';
import useWallet from '../../hooks/useWallet';
import { HypeClaim, PoolRewards } from '../../models/Redeem.model';
import { ClaimArgs, useContractEscrowClaim } from '../../hooks';
import { BigNumber } from 'ethers';
import { useRewardsClaim } from '../../api/rewards/useRewardsClaim';

export const useRedeemEffects = () => {
  const { isConnected } = useWallet();
  const defaultContractArgs: ClaimArgs = {
    receiver: null,
    poolId: null,
    amount: null,
    tokenAddress: null,
    nonce: null,
    hash: null,
  };
  const { data, isLoading: isLoadingRewards } = useGetMyRewards();
  const { submitHandler } = useRequestRewards();
  const { submitHandler: claimReward } = useRewardsClaim();
  const [claims, setClaims] = useState<HypeClaim[]>([]);
  const [claimArgs, setClaimArgs] = useState<ClaimArgs>(defaultContractArgs);
  const [claimHistory, setClaimHistory] = useState<HypeClaim[]>([]);
  const [enableClaim, setEnableClaim] = useState<boolean>(false);
  const [currentClaim, setCurrentClaim] = useState<HypeClaim>(null);
  const [poolRewards, setPoolRewards] = useState<PoolRewards[]>([]);

  const onClaimSuccess = () => {
    if (currentClaim) {
      setEnableClaim(false);
      setClaimArgs(defaultContractArgs);
      // Send backend claim success
      claimReward({
        id: currentClaim.id,
        rewardee: currentClaim.rewardee,
        poolId: currentClaim.poolId,
      });
    }
  };
  useContractEscrowClaim(claimArgs, enableClaim, onClaimSuccess);

  useEffect(() => {
    const setData = async () => {
      if (data) {
        setClaims(data.claims);
        setPoolRewards(data.totalUnclaimed);
        setClaimHistory(data.rewardsReceived);
      }
    };
    setData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onRedeem = (poolReward: PoolRewards) => {
    submitHandler({ poolId: poolReward.poolId });
  };
  const onClaim = (poolClaim: HypeClaim) => {
    if (poolClaim) {
      setCurrentClaim(poolClaim);
      setClaimArgs({
        receiver: poolClaim.rewardee,
        poolId: poolClaim.poolId,
        amount: BigNumber.from(poolClaim.amount),
        tokenAddress: poolClaim.tokenAddress,
        nonce: poolClaim.nonce,
        hash: poolClaim.hash,
      });
      setEnableClaim(true);
    }
  };

  return {
    claims,
    poolRewards,
    claimHistory,
    onRedeem,
    onClaim,
    isConnected,
    isLoadingRewards,
  };
};
