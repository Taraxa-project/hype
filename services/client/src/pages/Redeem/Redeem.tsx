import React from 'react';
import { useRedeemEffects } from './Redeem.effects';
import Box from '../../components/styles/Box';
import { ClaimHistoryContainer, TransactionsContainer } from '../../containers/redeem';

export const Redeem = () => {
  const { claims, claimHistory, poolRewards, onRedeem, onClaim, isLoadingRewards } =
    useRedeemEffects();
  return (
    <Box backgroundColor="background" minHeight="100vh" height="100%">
      <Box
        backgroundColor="background"
        display="flex"
        flexDirection="column"
        gridGap="1rem"
        justifyContent="center"
      >
        <TransactionsContainer
          totalPoolRewards={poolRewards}
          claims={claims}
          onRedeem={onRedeem}
          onClaim={onClaim}
          isLoadingRewards={isLoadingRewards}
        />
        <ClaimHistoryContainer claims={claimHistory} />
      </Box>
    </Box>
  );
};
