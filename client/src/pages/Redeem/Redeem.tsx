import React from 'react';
import Transaction from '../../components/transaction/Transaction';
import { Reward, TransactionItem, useRedeemEffects } from './Redeem.effects';

import Box from '../../components/styles/Box';
import Text from '../../components/styles/Text';
import Heading from '../../components/styles/Heading';
import { formatNumber } from '../../utils';
import DownIcon from '../../assets/icons/Down';
import UpIcon from '../../assets/icons/Up';
import Button from '../../components/button/Button';
import { NotConnectedMessage } from '../../components/notConnectedMessage/NotConnectedMessage';

export const Redeem = () => {
  const {
    showHistory,
    toggleHistory,
    totalUnredeemed,
    pendingTransactions,
    redeemHistory,
    rewards,
    onRedeem,
    connect,
    isConnected,
  } = useRedeemEffects();

  return (
    <Box
      display="flex"
      flexDirection={isConnected ? 'column' : 'row'}
      gridGap="1.5rem"
      justifyContent="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        backgroundColor="greys.1"
        p="2rem"
        borderRadius="2rem"
        mt="2rem"
      >
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="start">
          <Box display="flex" flexDirection="column" width="100%">
            <Heading
              fontSize="1.25rem"
              fontWeight="700"
              lineHeight="1.625rem"
              color="black"
              letterSpacing="-0.02em"
            >
              Redeem rewards
            </Heading>
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
              {isConnected ? `${formatNumber(totalUnredeemed)} TARA` : `N/A`}
            </Heading>
            {isConnected ? (
              <Box display="flex" flexDirection="row" alignItems="center" gridGap="1rem" mt="7rem">
                <Text color="greys.2" fontSize="1rem" fontWeight="700">
                  Show redemption history
                </Text>
                {showHistory ? (
                  <DownIcon click={toggleHistory} />
                ) : (
                  <UpIcon click={toggleHistory} />
                )}
              </Box>
            ) : (
              <Box mt="7rem">
                <Button size="full-width" onClick={connect}>
                  Connect Wallet
                </Button>
              </Box>
            )}
          </Box>
          {isConnected && pendingTransactions && (
            <Box display="flex" flexDirection="column" width="100%">
              <Heading
                fontSize="1.25rem"
                fontWeight="700"
                lineHeight="1.625rem"
                color="black"
                letterSpacing="-0.02em"
              >
                Pending transactions ({pendingTransactions?.length})
              </Heading>
              <Box display="flex" flexDirection="column" pt="2rem" gridGap="1rem">
                {pendingTransactions.map((transaction: TransactionItem) => (
                  <Transaction
                    key={`pending-${transaction.value}-${transaction.pool}-${
                      transaction.startDate
                    }-${Date.now()}`}
                    value={transaction.value}
                    pool={transaction.pool}
                    date={transaction.startDate}
                    status={transaction.status}
                    buttonAction={() => onRedeem(transaction)}
                    buttonName="Redeem"
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {isConnected && showHistory && redeemHistory?.length && (
          <Box display="flex" flexDirection="column" pt="4.1rem" gridGap="1rem">
            {redeemHistory.map((transactionItem: TransactionItem) => (
              <Transaction
                key={`history-${transactionItem.value}-${transactionItem.pool}-${
                  transactionItem.startDate
                }-${Date.now()}`}
                value={transactionItem.value}
                pool={transactionItem.pool}
                date={transactionItem.startDate}
                status={transactionItem.status}
              />
            ))}
          </Box>
        )}
      </Box>
      {rewards?.length > 0 && (
        <Box
          display="flex"
          flexDirection="column"
          backgroundColor="greys.1"
          p="2rem"
          borderRadius="2rem"
          mt="2rem"
        >
          <Heading
            fontSize="1.25rem"
            fontWeight="700"
            lineHeight="1.625rem"
            color="black"
            letterSpacing="-0.02em"
          >
            Rewards received ({rewards?.length})
          </Heading>
          {isConnected ? (
            <Box display="flex" flexDirection="column" pt="2.8rem" gridGap="1rem">
              {rewards.map((reward: Reward) => (
                <Transaction
                  key={`reward-${reward.value}-${reward.pool}-${reward.startDate}-${Date.now()}`}
                  value={reward.value}
                  pool={reward.pool}
                  date={reward.startDate}
                />
              ))}
            </Box>
          ) : (
            <Box>
              <NotConnectedMessage mt={3} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
