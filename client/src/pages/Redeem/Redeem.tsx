import React from 'react';
import Transaction from '../../components/transaction/Transaction';
import { Reward, TransactionItem, useRedeemEffects } from './Redeem.effects';

import Box from '../../components/styles/Box';
import Text from '../../components/styles/Text';
import Heading from '../../components/styles/Heading';
import { formatNumber } from '../../utils';
import DownIcon from '../../assets/icons/Down';
import UpIcon from '../../assets/icons/Up';

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
              {formatNumber(totalUnredeemed)} TARA
            </Heading>
            <Box display="flex" flexDirection="row" alignItems="center" gridGap="1rem" mt="7rem">
              <Text color="greys.2" fontSize="1rem" fontWeight="700">
                Show redemption history
              </Text>
              {showHistory ? <DownIcon click={toggleHistory} /> : <UpIcon click={toggleHistory} />}
            </Box>
          </Box>
          {pendingTransactions && (
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
                    value={transaction.value}
                    pool={transaction.pool}
                    date={transaction.startDate}
                    status={transaction.status}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {showHistory && redeemHistory?.length && (
          <Box display="flex" flexDirection="column" pt="4.1rem" gridGap="1rem">
            {redeemHistory.map((transactionItem: TransactionItem) => (
              <Transaction
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
          <Box display="flex" flexDirection="column" pt="2.8rem" gridGap="1rem">
            {rewards.map((reward: Reward) => (
              <Transaction value={reward.value} pool={reward.pool} date={reward.startDate} />
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};
