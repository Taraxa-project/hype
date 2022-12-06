import React from 'react';
import Box from '../../components/styles/Box';
import Heading from '../../components/styles/Heading';
import useWallet from 'src/hooks/useWallet';
import { NotAvailable } from '../../components/not-available/NotAvailable';
import Transaction from '../../components/transaction/Transaction';
import { HypeReward } from 'src/models/Redeem.model';

interface RewardProps {
  rewards: HypeReward[];
}

export const RewardsListContainer = ({ rewards }: RewardProps) => {
  const { isConnected, account } = useWallet();

  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundColor="greys.1"
      p="2rem"
      borderRadius="2rem"
      width={{ _: 'unset', sm: 'unset', md: isConnected ? 'unset' : '100%' }}
    >
      <Heading
        fontSize="1.25rem"
        fontWeight="700"
        lineHeight="1.625rem"
        color="black"
        letterSpacing="-0.02em"
      >
        Rewards received {rewards?.length ? `(${rewards?.length})` : ''}
      </Heading>
      {isConnected && account ? (
        rewards?.length > 0 ? (
          <Box display="flex" flexDirection="column" pt="2.8rem" gridGap="1rem">
            {rewards.map((reward) => (
              <Transaction
                key={`reward-${reward.amount.toString()}-${reward.id}-${Date.now()}`}
                value={reward.amount}
                symbol={reward.symbol}
                pool={'Hype Pool 1'}
                date={new Date()}
              />
            ))}
          </Box>
        ) : (
          <NotAvailable message="Looks like you haven`t received any rewards yet..." mt={3} />
        )
      ) : (
        <Box>
          <NotAvailable mt={3} />
        </Box>
      )}
    </Box>
  );
};
