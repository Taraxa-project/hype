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
  const { isConnected, account } = useWallet();
  const defaultContractArgs: ClaimArgs = {
    receiver: null,
    poolId: null,
    amount: null,
    tokenAddress: null,
    nonce: null,
    hash: null,
  };
  const { data, isLoading: isLoadingRewards } = useGetMyRewards(account);
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
      if (account && data) {
        const claims: HypeClaim[] = await getClaimSymbols(data.claims);
        setClaims(claims);
        const rewards: PoolRewards[] = await getRewardSymbols(data.totalUnclaimed);
        setPoolRewards(rewards);
        const releasedRewards: HypeClaim[] = await getClaimSymbols(data.rewardsReceived);
        setClaimHistory(releasedRewards);
      }
    };
    setData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, data]);

  const onRedeem = (poolReward: PoolRewards) => {
    submitHandler({ address: account, poolId: poolReward.poolId });
  };
  const onClaim = (poolClaim: HypeClaim) => {
    console.log('poolClaim: ', poolClaim);
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

  const getClaimSymbols = async (claims: HypeClaim[]) => {
    let targetArray: HypeClaim[] = [];
    await Promise.all(
      claims.map(async (claim) => {
        let symbol;
        try {
          symbol = await getERC20TokenName(claim.tokenAddress);
        } catch (error) {
          console.error(error);
        }
        targetArray.push({
          ...claim,
          symbol: symbol,
        });
        return targetArray;
      }),
    );
    return targetArray;
  };

  const getRewardSymbols = async (rewards: PoolRewards[]) => {
    let targetArray: PoolRewards[] = [];
    await Promise.all(
      rewards.map(async (reward) => {
        let symbol;
        try {
          symbol = await getERC20TokenName(reward.tokenAddress);
        } catch (error) {
          console.error(error);
        }
        targetArray.push({
          ...reward,
          symbol: symbol,
        });
        return targetArray;
      }),
    );
    return targetArray;
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
