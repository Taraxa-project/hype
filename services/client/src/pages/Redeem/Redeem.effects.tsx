import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useGetMyRewards } from 'src/api/rewards/useGetUserRewards';
import { HypeReward, TokenSummary } from 'src/models/Redeem.model';
import { getERC20TokenName } from 'src/utils/tokens';
import useWallet from '../../hooks/useWallet';
import { TransactionItem } from '../../models/Reward.model';
import { TransactionStatus, zeroAddress } from '../../utils';

export const useRedeemEffects = () => {
  const { isConnected, account } = useWallet();
  const [totalUnredeemeds, setTotalUnredeemeds] = useState<TokenSummary[]>([
    { unclaimed: BigNumber.from('0'), token: zeroAddress },
  ]);
  const { data, refetch: isFetchingRedeemData } = useGetMyRewards(account);
  const [claimedRewards, setClaimedRewards] = useState<HypeReward[]>([]);
  const [unclaimedRewards, setUnclaimedRewards] = useState<HypeReward[]>([]);

  useEffect(() => {
    const setData = async () => {
      if (account && data) {
        console.log(data);
        const unclaimedsWithSymbol: TokenSummary[] = [];
        await getSummarySymbols(unclaimedsWithSymbol, data.totalUnclaimeds);
        setTotalUnredeemeds(unclaimedsWithSymbol);
        const unclaimeds: HypeReward[] = [];
        await getRewardSymbols(unclaimeds, data.unclaimed);
        setUnclaimedRewards(unclaimeds);
        const claimeds: HypeReward[] = [];
        await getRewardSymbols(claimeds, data.claimed);
        setClaimedRewards(claimeds);
      }
    };
    setData();
  }, [account, data]);

  const pendingTransactions: TransactionItem[] = [
    {
      value: totalUnredeemeds[0]?.unclaimed,
      symbol: totalUnredeemeds[0]?.symbol,
      pool: 'Overall Rewards',
      status: TransactionStatus.PENDING,
      startDate: new Date(),
    },
  ];

  const onRedeem = (transaction: TransactionItem) => {
    console.log('Redeeming: ', transaction);
  };

  const getSummarySymbols = async (
    targetArray: TokenSummary[],
    totalUnclaimeds: TokenSummary[],
  ) => {
    for (const rewardSummary of totalUnclaimeds) {
      let symbol;
      try {
        symbol = await getERC20TokenName(rewardSummary.token);
      } catch (error) {
        console.error(error);
      }
      targetArray.push({
        ...rewardSummary,
        symbol: symbol || 'TARA',
      });
    }
  };

  const getRewardSymbols = async (targetArray: HypeReward[], rewards: HypeReward[]) => {
    for (const reward of rewards) {
      let symbol;
      try {
        symbol = await getERC20TokenName(reward.tokenAddress);
      } catch (error) {
        console.error(error);
      }
      targetArray.push({
        ...reward,
        symbol: symbol || 'TARA',
      });
    }
  };

  return {
    totalUnredeemeds,
    pendingTransactions,
    claimedRewards,
    unclaimedRewards,
    onRedeem,
    isConnected,
  };
};
