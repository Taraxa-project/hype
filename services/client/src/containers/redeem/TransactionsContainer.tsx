import Box from '../../components/styles/Box';
import Heading from '../../components/styles/Heading';
import useWallet from '../../hooks/useWallet';
import Transaction from '../../components/transaction/Transaction';
import { HypeClaim, PoolRewards } from '../../models';
import { TransactionStatus } from '../../utils';
import { NotAvailable } from '../../components/not-available/NotAvailable';
import LoadingSpinner from '../../assets/icons/Spinner';
import { RoundContainer } from '../../components/container/RoundContainer.styled';


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
    <RoundContainer minWidth={!isConnected ? { md: '340px', lg: '340px', xl: '340px' } : ''}>
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
                    <Box
                      display="flex"
                      flexDirection="column"
                      py="1rem"
                      gridGap="1rem"
                      key={`redeem-${reward.unclaimed}-${reward.poolId}-${reward.pool?.title}`}
                    >
                      <Transaction
                        value={reward.unclaimed}
                        pool={reward.pool}
                        rewards={reward.rewards}
                        date={new Date()}
                        status={TransactionStatus.PENDING}
                        buttonAction={() => onRedeem(reward)}
                        buttonName="Redeem"
                      />
                  
                    </Box>
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
                      pool={claim.pool}
                      rewards={claim.rewards}
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
    </RoundContainer>
  );
};
