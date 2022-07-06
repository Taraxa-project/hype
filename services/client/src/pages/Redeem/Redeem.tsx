import React from 'react';
import { useRedeemEffects } from './Redeem.effects';
import Box from '../../components/styles/Box';
import { RewardsListContainer, TransactionsContainer } from '../../containers/redeem';

export const Redeem = () => {
  const { totalUnredeemed, pendingTransactions, redeemHistory, rewards, onRedeem, isConnected } =
    useRedeemEffects();

  return (
    <Box backgroundColor="background" height={!isConnected ? '100vh' : '100%'}>
      <Box
        backgroundColor="background"
        display="flex"
        flexDirection={{
          xs: 'column',
          sm: 'column',
          md: isConnected ? 'column' : 'row',
          lg: isConnected ? 'column' : 'row',
          xl: isConnected ? 'column' : 'row',
        }}
        gridGap="1rem"
        justifyContent="center"
      >
        <TransactionsContainer
          pendingTransactions={pendingTransactions}
          redeemHistory={redeemHistory}
          totalUnredeemed={totalUnredeemed}
          onRedeem={onRedeem}
        />
        <RewardsListContainer rewards={rewards} />
      </Box>
    </Box>
  );
};
