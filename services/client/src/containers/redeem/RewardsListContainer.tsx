import React, { useState } from 'react';
import Box from '../../components/styles/Box';
import Heading from '../../components/styles/Heading';
import useWallet from '../../hooks/useWallet';
import Text from '../../components/styles/Text';
import { NotAvailable } from '../../components/not-available/NotAvailable';
import Transaction from '../../components/transaction/Transaction';
import { HypeClaim, HypeReward } from '../../models/Redeem.model';
import UpIcon from '../../assets/icons/Up';
import DownIcon from '../../assets/icons/Down';
import { TransactionStatus } from '../../utils';
import { RoundContainer } from '../../components/container/RoundContainer.styled';

interface RewardProps {
  claims: HypeClaim[];
}

export const ClaimHistoryContainer = ({ claims }: RewardProps) => {
  const { isConnected } = useWallet();
  const [showHistory, setShowHistory] = useState<boolean>(true);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <RoundContainer width="unset">
      <Heading
        fontSize="1.25rem"
        fontWeight="700"
        lineHeight="1.625rem"
        color="black"
        letterSpacing="-0.02em"
      >
        Rewards received {claims.length}
      </Heading>
      {isConnected && (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent={{ xs: 'center', sm: 'center', md: 'start' }}
          gridGap="1rem"
        >
          <Text color="greys.3" fontSize="1rem" fontWeight="400">
            {showHistory ? 'Hide' : 'Show'} redemption history
          </Text>
          {showHistory ? <UpIcon click={toggleHistory} /> : <DownIcon click={toggleHistory} />}
        </Box>
      )}
      {isConnected ? (
        showHistory ? (
          <Box>
            {claims.length > 0 ? (
              <Box display="flex" flexDirection="column" pt="2.4rem" gridGap="1rem">
                {claims.map((transactionItem: HypeReward) => (
                  <Transaction
                    key={`history-${transactionItem.amount.toString()}-${
                      transactionItem.id
                    }-${Date.now()}`}
                    value={transactionItem.amount}
                    symbol={transactionItem.symbol}
                    pool={transactionItem.pool?.title}
                    date={new Date()}
                    status={TransactionStatus.REDEEMED}
                  />
                ))}
              </Box>
            ) : (
              <NotAvailable message="Looks like you haven`t received any rewards yet..." mt={3} />
            )}
          </Box>
        ) : (
          <></>
        )
      ) : (
        <Box>
          <NotAvailable mt={3} />
        </Box>
      )}
    </RoundContainer>
  );
};
