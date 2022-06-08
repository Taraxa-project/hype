import React from 'react';
import Transaction from '../../components/transaction/Transaction';
import { Reward, useRedeemEffects } from './Redeem.effects';
import { RewardContainer, RewardContent, RewardTitle } from './Redeem.styled';

export const Redeem = () => {
  const { showHistory, toggleHistory, totalUnredeemed, redeemHistory, rewards, onRedeem } =
    useRedeemEffects();

  return (
    <>
      {rewards?.length > 0 && (
        <RewardContainer>
          <RewardTitle>Rewards received ({rewards?.length})</RewardTitle>
          <RewardContent>
            {rewards.map((reward: Reward) => (
              <Transaction value={reward.value} pool={reward.pool} date={reward.startDate} />
            ))}
          </RewardContent>
        </RewardContainer>
      )}
    </>
  );
};
