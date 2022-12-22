import Box from '../../components/styles/Box';
import Heading from '../../components/styles/Heading';
import useWallet from 'src/hooks/useWallet';
import Transaction from '../../components/transaction/Transaction';
import { HypeClaim, PoolRewards } from 'src/models/Redeem.model';
import { TransactionStatus } from 'src/utils';
import { NotAvailable } from '../../components/not-available/NotAvailable';
import LoadingSpinner from '../../assets/icons/Spinner';

interface TransactionsProps {
  totalPoolRewards: PoolRewards[];
  claims: HypeClaim[];
  onRedeem: (transaction: PoolRewards) => void;
  onClaim: (transaction: HypeClaim) => void;
  isLoadingRewards: boolean;
}

export const TransactionsContainer = ({
  totalPoolRewards,
  claims,
  onRedeem,
  onClaim,
  isLoadingRewards,
}: TransactionsProps) => {
  const { isConnected } = useWallet();

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
        flexDirection={{ _: 'column', lg: 'column', xl: 'column' }}
        justifyContent="space-between"
        alignItems="start"
        gridGap="1rem"
      >
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          mt={{ _: '3.5rem', lg: '0' }}
          justifyContent="center"
        >
          <Heading
            fontSize="1.25rem"
            fontWeight="700"
            lineHeight="1.625rem"
            color="black"
            letterSpacing="-0.02em"
          >
            Rewards by pool ({totalPoolRewards?.length})
          </Heading>
          {isConnected ? (
            <>
              {isLoadingRewards && (
                <Box display="flex" justifyContent="center" alignItems="center" my={3}>
                  <LoadingSpinner />
                </Box>
              )}
              <Box display="flex" flexDirection="column" py="2rem" gridGap="1rem">
                {totalPoolRewards?.map((pool) => (
                  <Transaction
                    key={`redeem-${pool.unclaimed?.toString()}-${pool.poolId}-${pool.poolName}`}
                    value={pool.unclaimed}
                    symbol={pool.symbol}
                    pool={pool.poolName}
                    date={new Date()}
                    status={TransactionStatus.PENDING}
                    buttonAction={() => onRedeem(pool)}
                    buttonName="Redeem"
                  />
                ))}
              </Box>
            </>
          ) : (
            <Box>
              <NotAvailable message="Connect wallet to see the rewards available..." mt={3} />
            </Box>
          )}
        </Box>
        <Box display="flex" flexDirection="column" width="100%" mt={{ _: '3.5rem', lg: '0' }}>
          <Heading
            fontSize="1.25rem"
            fontWeight="700"
            lineHeight="1.625rem"
            color="black"
            letterSpacing="-0.02em"
          >
            Claims by pool ({claims?.length})
          </Heading>
          {isConnected ? (
            <>
              {isLoadingRewards && (
                <Box display="flex" justifyContent="center" alignItems="center" my={3}>
                  <LoadingSpinner />
                </Box>
              )}
              <Box display="flex" flexDirection="column" pt="2rem" gridGap="1rem">
                {claims?.map((claim) => (
                  <Transaction
                    key={`claim-${claim.id}-${claim.poolId}`}
                    value={claim.amount}
                    symbol={claim.symbol || 'TARA'}
                    pool={claim.poolName || 'APE Hype 12'}
                    date={new Date()}
                    status={TransactionStatus.REDEEMED}
                    buttonAction={() => onClaim(claim)}
                    buttonName="Claim"
                  />
                ))}
              </Box>
            </>
          ) : (
            <Box>
              <NotAvailable message="Connect wallet to see the claims available..." mt={3} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
