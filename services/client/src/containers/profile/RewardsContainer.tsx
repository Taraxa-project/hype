import React from 'react';
import Box from '../../components/styles/Box';
import Text from '../../components/styles/Text';
import Heading from '../../components/styles/Heading';
import Button from '../../components/button/Button';
import useWallet from '../../hooks/useWallet';
import { formatNumber } from '../../utils';

interface RewardProps {
  rewardAmount: number;
  onRedeem: () => void;
}

export const RewardsContainer = (props: RewardProps) => {
  const { isConnected } = useWallet();

  return (
    <Box
      p={{ _: '1.5rem', sm: '1.5rem', md: '2rem' }}
      borderRadius="10px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      backgroundColor="greys.1"
      minWidth={{ sm: 'unset', md: '340px' }}
    >
      <Heading
        fontSize="1.25rem"
        fontWeight="700"
        lineHeight="1.625rem"
        color="black"
        letterSpacing="-0.02em"
      >
        Redeem rewards
      </Heading>
      <Box display="flex" flexDirection="column" gridGap="0.5rem" mb="3rem">
        <Text pt="2rem" color="greys.2" fontSize="1rem" fontWeight="700">
          Total rewards unredeemed
        </Text>
        <Heading
          fontSize="2.25rem"
          fontWeight="700"
          lineHeight="2.75rem"
          color="black"
          letterSpacing="-0.02em"
        >
          {isConnected
            ? formatNumber(props.rewardAmount)
              ? `${formatNumber(props.rewardAmount)} Pools`
              : `N/A`
            : `N/A`}
        </Heading>
      </Box>
      <Button
        variant={
          isConnected && props.rewardAmount && props.rewardAmount > 0 ? 'primary' : 'secondary'
        }
        size="small"
        onClick={props.onRedeem}
        disabled={!isConnected}
      >
        Go to Redeem
      </Button>
    </Box>
  );
};
