import React from 'react';
import Transaction from '../../components/transaction/Transaction';
import { Reward, TransactionItem, useRedeemEffects } from './Redeem.effects';
import {
  RewardContainer,
  RewardContent,
  RowContainer,
  RewardTitle,
  ColContainer,
} from './Redeem.styled';

export const Redeem = () => {
  const {
    showHistory,
    toggleHistory,
    totalUnredeemed,
    pendingTransactions,
    redeemHistory,
    rewards,
    onRedeem,
  } = useRedeemEffects();

  return (
    <>
      <RewardContainer>
        <RowContainer>
          <ColContainer>
            <RewardTitle>Redeem rewards</RewardTitle>
          </ColContainer>
          {pendingTransactions && (
            <ColContainer>
              <RewardTitle>Pending transactions ({pendingTransactions?.length})</RewardTitle>
              <RewardContent>
                {pendingTransactions.map((transaction: TransactionItem) => (
                  <Transaction
                    value={transaction.value}
                    pool={transaction.pool}
                    date={transaction.startDate}
                    status={transaction.status}
                  />
                ))}
              </RewardContent>
            </ColContainer>
          )}
        </RowContainer>
      </RewardContainer>
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
