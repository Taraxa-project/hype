import { useEffect, useState } from 'react';
import { useGetMyRewards } from 'src/api/rewards/useGetUserRewards';
import { HypeClaim, PoolRewards } from 'src/models/Redeem.model';
import { getPoolDetailsById } from 'src/utils/pools';
import { getERC20TokenName } from 'src/utils/tokens';
import { useProvider } from 'wagmi';
import useWallet from '../../hooks/useWallet';

export const useRedeemEffects = () => {
  const { isConnected, account } = useWallet();
  const provider = useProvider();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    data,
    isLoading: isLoadingRewards,
    refetch: isFetchingRedeemData,
  } = useGetMyRewards(account);
  const [claims, setClaims] = useState<HypeClaim[]>([]);
  const [claimHistory, setClaimHistory] = useState<HypeClaim[]>([]);
  const [poolRewards, setPoolRewards] = useState<PoolRewards[]>([]);

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
  };
  const onClaim = (poolClaim: HypeClaim) => {
    console.log('Redeeming: ', poolClaim);
  };

  const getClaimSymbols = async (targetArray: HypeClaim[], rewards: HypeClaim[]) => {
    for (const reward of rewards) {
      let symbol;
      let name;
      try {
        symbol = await getERC20TokenName(reward.tokenAddress);
        name = (await getPoolDetailsById(reward.poolId, provider))[3].title;
      } catch (error) {
        console.error(error);
      }
      targetArray.push({
        ...reward,
        symbol: symbol,
        poolName: name,
      });
    }
  };

  const getRewardSymbols = async (targetArray: PoolRewards[], rewards: PoolRewards[]) => {
    for (const reward of rewards) {
      let symbol;
      let name;
      try {
        symbol = await getERC20TokenName(reward.tokenAddress);
        name = (await getPoolDetailsById(reward.poolId, provider))[3].title;
      } catch (error) {
        console.error(error);
      }
      targetArray.push({
        ...reward,
        symbol: symbol,
        poolName: name,
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
