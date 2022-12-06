import React, { useState } from 'react';
import Box from '../../components/styles/Box';
import Heading from '../../components/styles/Heading';
import useWallet from 'src/hooks/useWallet';
import { NotAvailable } from '../../components/not-available/NotAvailable';
import Transaction from '../../components/transaction/Transaction';
import Text from '../../components/styles/Text';
import DownIcon from '../../assets/icons/Down';
import UpIcon from '../../assets/icons/Up';
import { ConnectWalletBtn } from '../../components/connect-wallet-btn/ConnectWalletBtn';
import { TransactionItem } from '../../models/Reward.model';
import { utils } from 'ethers';
import { HypeReward, TokenSummary } from 'src/models/Redeem.model';
import { TransactionStatus } from 'src/utils';
import Button from 'src/components/button/Button';

interface TransactionsProps {
  pendingTransactions: TransactionItem[];
  redeemHistory: HypeReward[];
  totalUnredeemeds: TokenSummary[];
  onRedeem: (transaction: TransactionItem) => void;
}

export const TransactionsContainer = ({
  pendingTransactions,
  redeemHistory,
  totalUnredeemeds,
  onRedeem,
}: TransactionsProps) => {
  const { isConnected } = useWallet();
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundColor="greys.1"
      p="2rem"
      borderRadius="2rem"
      minWidth={!isConnected ? { md: '340px', lg: '340px', xl: '340px' } : ''}
    >
      <Box
        display="flex"
        flexDirection={{ _: 'column', lg: 'row', xl: 'row' }}
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
            {isConnected
              ? totalUnredeemeds.map((totalUnredeemed) => (
                  <div>
                    {utils.formatEther(totalUnredeemed.unclaimed)} {totalUnredeemed.symbol}
                  </div>
                ))
              : `N/A`}
          </Heading>
        </Box>
        {isConnected && !!pendingTransactions?.length && (
          <Box display="flex" flexDirection="column" width="100%" mt={{ _: '3.5rem', lg: '0' }}>
            <Heading
              fontSize="1.25rem"
              fontWeight="700"
              lineHeight="1.625rem"
              color="black"
              letterSpacing="-0.02em"
            >
              Pending transactions ({pendingTransactions?.length})
            </Heading>
            <Box display="flex" flexDirection="row" width="100%" mt={{ _: '3.5rem', lg: '0' }}>
              <Button
                style={{ marginRight: '3%' }}
                size="regular"
                variant="primary"
                onClick={() => console.log('button')}
              >
                TARA
              </Button>
              <Button
                style={{ marginRight: '3%' }}
                size="regular"
                variant="secondary"
                onClick={() => console.log('button')}
              >
                USDC
              </Button>
              <Button size="regular" variant="secondary" onClick={() => console.log('button')}>
                USDT
              </Button>
            </Box>
            <Box display="flex" flexDirection="column" pt="2rem" gridGap="1rem">
              {pendingTransactions?.map((transaction: TransactionItem) => (
                <Transaction
                  key={`pending-${transaction.value}-${transaction.pool}-${
                    transaction.startDate
                  }-${Date.now()}`}
                  value={transaction.value}
                  symbol={transaction.symbol}
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
              {redeemHistory.map((transactionItem: HypeReward) => (
                <Transaction
                  key={`history-${transactionItem.amount.toString()}-${
                    transactionItem.id
                  }-${Date.now()}`}
                  value={transactionItem.amount}
                  symbol={transactionItem.symbol}
                  pool={'hype Pool12'}
                  date={new Date()}
                  status={TransactionStatus.REDEEMED}
                />
              ))}
            </Box>
          ) : (
            <NotAvailable message="Looks like you haven`t received any rewards yet..." mt={3} />
          )}
        </Box>
      )}
    </Box>
  );
};
