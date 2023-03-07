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
      borderRadius="10px"
      minWidth={!isConnected ? { md: '340px', lg: '340px', xl: '340px' } : ''}
    >
      <Box
        display="flex"
        flexDirection={{ _: 'column', lg: 'column', xl: 'column' }}
        justifyContent="space-between"
        alignItems="start"
        gridGap="1rem"
      >
        <Box display="flex" flexDirection="column" width="100%" mt={0} justifyContent="center">
          <Heading
            fontSize="1.25rem"
            fontWeight="700"
            lineHeight="1.625rem"
            color="black"
            letterSpacing="-0.02em"
          >
            Rewards by pool ({totalPoolRewards.length})
          </Heading>
          {isConnected ? (
            <>
              {isLoadingRewards && (
                <Box display="flex" justifyContent="center" alignItems="center" my={3}>
                  <LoadingSpinner />
                </Box>
              )}
              {totalPoolRewards.length > 0 ? (
                <Box display="flex" flexDirection="column" py="1rem" gridGap="1rem">
                  {totalPoolRewards.map((reward) => (
                    <Transaction
                      key={`redeem-${reward.unclaimed}-${reward.poolId}-${
                        reward.pool.title
                      }`}
                      value={reward.unclaimed}
                      symbol={reward.symbol}
                      pool={reward.pool.title}
                      date={new Date()}
                      status={TransactionStatus.PENDING}
                      buttonAction={() => onRedeem(reward)}
                      buttonName="Redeem"
                    />
                  ))}
                </Box>
              ) : (
                <Box>
                  <NotAvailable message="There aren't any rewards available..." mt={3} />
                </Box>
              )}
            </>
          ) : (
            <Box>
              <NotAvailable message="Connect wallet to see the rewards available..." mt={3} />
            </Box>
          )}
        </Box>
        <Box display="flex" flexDirection="column" width="100%" mt={0}>
          <Heading
            fontSize="1.25rem"
            fontWeight="700"
            lineHeight="1.625rem"
            color="black"
            letterSpacing="-0.02em"
          >
            Claims by pool ({claims.length})
          </Heading>
          {isConnected ? (
            <>
              {isLoadingRewards && (
                <Box display="flex" justifyContent="center" alignItems="center" my={3}>
                  <LoadingSpinner />
                </Box>
              )}
              {claims.length > 0 ? (
                <Box display="flex" flexDirection="column" pt="2rem" gridGap="1rem">
                  {claims.map((claim) => (
                    <Transaction
                      key={`claim-${claim.id}-${claim.poolId}`}
                      value={claim.amount}
                      symbol={claim.symbol || 'TARA'}
                      pool={claim.pool.title || 'APE Hype 12'}
                      date={new Date()}
                      status={TransactionStatus.REDEEMED}
                      buttonAction={() => onClaim(claim)}
                      buttonName="Claim"
                    />
                  ))}
                </Box>
              ) : (
                <Box>
                  <NotAvailable message="There aren't any claims available..." mt={3} />
                </Box>
              )}
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
