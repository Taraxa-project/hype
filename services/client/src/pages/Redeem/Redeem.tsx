import React from 'react';
import Transaction from '../../components/transaction/Transaction';
import { Reward, TransactionItem, useRedeemEffects } from './Redeem.effects';

import Box from '../../components/styles/Box';
import Text from '../../components/styles/Text';
import Heading from '../../components/styles/Heading';
import { formatNumber } from '../../utils';
import DownIcon from '../../assets/icons/Down';
import UpIcon from '../../assets/icons/Up';
import { NotAvailable } from '../../components/not-available/NotAvailable';
import { ConnectWalletBtn } from '../../components/connect-wallet-btn/ConnectWalletBtn';

export const Redeem = () => {
  const {
    showHistory,
    toggleHistory,
    totalUnredeemed,
    pendingTransactions,
    redeemHistory,
    rewards,
    onRedeem,
    isConnected,
  } = useRedeemEffects();

  return (
    <Box
      display="flex"
      flexDirection={{
        xs: 'column',
        sm: 'column',
        md: isConnected ? 'column' : 'row',
        lg: isConnected ? 'column' : 'row',
        xl: isConnected ? 'column' : 'row',
      }}
      gridGap="1.5rem"
      px={{ sm: '1rem', md: '4rem', xl: '12.5rem' }}
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
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'column', lg: 'row', xl: 'row' }}
          justifyContent="space-between"
          alignItems="start"
        >
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
          </Box>
          {isConnected && !!pendingTransactions?.length && (
            <Box
              display="flex"
              flexDirection="column"
              width="100%"
              mt={{ xs: '3.5rem', sm: '3.5rem', md: '3.5rem', lg: '0' }}
            >
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
                {pendingTransactions?.map((transaction: TransactionItem) => (
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

        {isConnected ? (
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent={{ xs: 'center', sm: 'center', md: 'start' }}
            gridGap="1rem"
            mt={{ xs: '2.4rem', sm: '2.4rem' }}
          >
            <Text color="greys.2" fontSize="1rem" fontWeight="700">
              {showHistory ? 'Hide' : 'Show'} redemption history
            </Text>
            {showHistory ? <UpIcon click={toggleHistory} /> : <DownIcon click={toggleHistory} />}
          </Box>
        ) : (
          <Box mt="2.4rem">
           <ConnectWalletBtn />
          </Box>
        )}
        {isConnected && showHistory && (
          <Box>
            {!!redeemHistory?.length ? (
              <Box display="flex" flexDirection="column" pt="2.4rem" gridGap="1rem">
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
            ) : (
              <NotAvailable message="Looks like you haven`t received any rewards yet..." mt={3} />
            )}
          </Box>
        )}
      </Box>

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
          Rewards received {rewards?.length ? `(${rewards?.length})` : ''}
        </Heading>
        {isConnected ? (
          rewards?.length > 0 ? (
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
            <NotAvailable message="Looks like you haven`t received any rewards yet..." mt={3} />
          )
        ) : (
          <Box>
            <NotAvailable mt={3} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
