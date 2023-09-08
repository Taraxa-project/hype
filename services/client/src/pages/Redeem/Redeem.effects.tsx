import { useEffect, useState } from 'react';
import { useGetMyRewards } from '../../api/rewards/useGetUserRewards';
import { useRequestRewards } from '../../api/rewards/useRequestRewards';
import useWallet from '../../hooks/useWallet';
import { HypeClaim, PoolRewards } from '../../models/Redeem.model';
import { ClaimArgs, useEscrow } from '../../hooks';
import { BigNumber } from 'ethers';
import { useRewardsClaim } from '../../api/rewards/useRewardsClaim';

export const useRedeemEffects = () => {
  const { isConnected } = useWallet();
  const { data, isLoading: isLoadingRewards } = useGetMyRewards();
  const { submitHandler } = useRequestRewards();
  const { submitHandler: claimReward } = useRewardsClaim();
  const [claims, setClaims] = useState<HypeClaim[]>([]);
  const [claimHistory, setClaimHistory] = useState<HypeClaim[]>([]);
  const [poolRewards, setPoolRewards] = useState<PoolRewards[]>([]);
  const { claim } = useEscrow();

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
      const claimArgs: ClaimArgs = {
        receiver: poolClaim.rewardee,
        poolId: poolClaim.poolId,
        amount: BigNumber.from(poolClaim.amount),
        tokenAddress: poolClaim.tokenAddress,
        nonce: poolClaim.nonce,
        hash: poolClaim.hash,
      };
      claim(claimArgs, () => {
        claimReward({
          id: poolClaim.id,
          poolId: poolClaim.poolId,
        });
      });
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
