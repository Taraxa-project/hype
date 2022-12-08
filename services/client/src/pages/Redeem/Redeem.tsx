import React from 'react';
import { useRedeemEffects } from './Redeem.effects';
import Box from '../../components/styles/Box';
import { ClaimHistoryContainer, TransactionsContainer } from '../../containers/redeem';

export const Redeem = () => {
  const { claims, claimHistory, poolRewards, onRedeem, onClaim, isConnected } = useRedeemEffects();

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
          totalPoolRewards={poolRewards}
          claims={claims}
          onRedeem={onRedeem}
          onClaim={onClaim}
        />
        <ClaimHistoryContainer claims={claimHistory} />
      </Box>
    </Box>
  );
};
