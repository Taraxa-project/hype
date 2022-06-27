import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Box from '../../components/styles/Box';
import Text from '../../components/styles/Text';
import Heading from '../../components/styles/Heading';
import Button from 'src/components/button/Button';
import useWallet from 'src/hooks/useWallet';
import { formatNumber } from '../../utils';

interface RewardProps {
  rewardAmount: number;
  onRedeem: () => void;
}

export const RewardsContainer = (props: RewardProps) => {
  const { isConnected } = useWallet();
  const isMobile = useMediaQuery({ query: `(max-width: 1050px)` });

  return (
    <Box
      p={isMobile ? '1.5rem' : '2rem'}
      borderRadius="2rem"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      backgroundColor="greys.1"
      marginLeft={isMobile ? 'none' : '1rem'}
      marginRight={isMobile ? '1rem' : 'none'}
      marginBottom="1rem"
      minWidth="340px"
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
      <Box display="flex" flexDirection="column" gridGap="0.5rem">
        <Text pt="2rem" color="greys.2" fontSize="1rem" fontWeight="700">
          Total unredeemed
        </Text>
        <Heading
          fontSize="2.25rem"
          fontWeight="700"
          lineHeight="2.75rem"
          color="black"
          letterSpacing="-0.02em"
        >
          {isConnected ? `${formatNumber(props.rewardAmount)} TARA` : `N/A`}
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
        Redeem all
      </Button>
    </Box>
  );
};
