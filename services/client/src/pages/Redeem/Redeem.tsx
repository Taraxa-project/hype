import React from 'react';
import { useRedeemEffects } from './Redeem.effects';
import Box from '../../components/styles/Box';
import { RewardsListContainer, TransactionsContainer } from '../../containers/redeem';

export const Redeem = () => {
  const {
    totalUnredeemeds,
    pendingTransactions,
    claimedRewards,
    unclaimedRewards,
    onRedeem,
    isConnected,
  } = useRedeemEffects();

  return (
    <Box backgroundColor="background" minHeight="100vh" height="100%">
      <Box
        backgroundColor="background"
        display="flex"
        flexDirection={{
          _: 'column',
          md: isConnected ? 'column' : 'row',
          lg: isConnected ? 'column' : 'row',
          xl: isConnected ? 'column' : 'row',
        }}
        gridGap="1rem"
        justifyContent="center"
      >
        <TransactionsContainer
          pendingTransactions={pendingTransactions}
          redeemHistory={claimedRewards}
          totalUnredeemeds={totalUnredeemeds}
          onRedeem={onRedeem}
        />
        <RewardsListContainer rewards={unclaimedRewards} />
      </Box>
    </Box>
  );
};
