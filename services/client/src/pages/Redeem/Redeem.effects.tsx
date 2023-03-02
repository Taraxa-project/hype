import { useEffect, useState } from 'react';
import { useGetMyRewards } from '../../api/rewards/useGetUserRewards';
import { getERC20TokenName } from '../../utils/tokens';
import { useRequestRewards } from '../../api/rewards/useRequestRewards';
import useWallet from '../../hooks/useWallet';
import { HypeClaim, PoolRewards } from '../../models/Redeem.model';
import { ClaimArgs, useContractEscrowClaim } from '../../hooks';
import { BigNumber } from 'ethers';

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
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);
  const { data, isLoading: isLoadingRewards } = useGetMyRewards(account, shouldRefetch);
  const { submitHandler, data: requestHashData } = useRequestRewards();
  const [claims, setClaims] = useState<HypeClaim[]>([]);
  const [claimArgs, setClaimArgs] = useState<ClaimArgs>(defaultContractArgs);
  const [claimHistory, setClaimHistory] = useState<HypeClaim[]>([]);
  const [enableClaim, setEnableClaim] = useState<boolean>(false);
  const [poolRewards, setPoolRewards] = useState<PoolRewards[]>([]);
  const onClaimSuccess = () => {
    setEnableClaim(false);
    setClaimArgs(defaultContractArgs);
    // Send backend claim success
  };
  useContractEscrowClaim(claimArgs, enableClaim, onClaimSuccess);

  useEffect(() => {
    if (requestHashData?.data) {
      setShouldRefetch(true);
    }
  }, [requestHashData]);

  useEffect(() => {
    const setData = async () => {
      if (account && data) {
        const claims: HypeClaim[] = [];
        await getClaimSymbols(claims, data.claims);
        setClaims(claims);
        const rewards: PoolRewards[] = [];
        await getRewardSymbols(rewards, data.totalUnclaimed);
        setPoolRewards(rewards);

        // remove this after TheGraph is connected
        const claimHistory = [...claims];
        for (const claim of claimHistory) {
          claim.claimed = true;
        }
        setClaimHistory(claimHistory);
      }
    };
    setData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, data]);

  const onRedeem = (poolReward: PoolRewards) => {
    console.log('Redeeming: ', poolReward);
    submitHandler({ address: account, poolId: poolReward.poolId });
  };
  const onClaim = (poolClaim: HypeClaim) => {
    console.log('Claiming: ', poolClaim);
    if (poolClaim) {
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

  const getClaimSymbols = async (targetArray: HypeClaim[], rewards: HypeClaim[]) => {
    for (const reward of rewards) {
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
    }
  };

  const getRewardSymbols = async (targetArray: PoolRewards[], rewards: PoolRewards[]) => {
    for (const reward of rewards) {
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
