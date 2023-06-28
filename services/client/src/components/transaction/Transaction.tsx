import { useState } from 'react';
import { BigNumber, utils } from 'ethers';
import { formatDate, TransactionStatus } from '../../utils';
import Button from '../button/Button';
import Box from '../styles/Box';
import Text from '../styles/Text';
import Heading from '../styles/Heading';
import { useTokenDetails } from '../../hooks';
import { ImpressionsList } from '../../containers/redeem/ImpressionsList';
import { HypePool, RewardsDetails } from '../../models';
import UpIcon from '../../assets/icons/Up';
import DownIcon from '../../assets/icons/Down';
import CheckMarkIcon from '../../assets/icons/Check';
import PendingIcon from '../../assets/icons/Pending';

export interface TransactionProps {
  value: BigNumber;
  pool?: HypePool;
  status?: TransactionStatus;
  date: Date;
  buttonName?: string;
  buttonAction?: (transaction: any) => void;
  impressions?: RewardsDetails[];
}

const Transaction = ({ value, pool, status, date, buttonName, buttonAction, impressions }: TransactionProps) => {
  const { tokenSymbol } = useTokenDetails(pool);
  const [showImpressions, setShowImpression] = useState<boolean>(false);

  return (
    <Box backgroundColor="greys.0" p="1.313rem" borderRadius="10px">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb="1.5rem"
      >
        <Heading
          fontSize="1.25rem"
          fontWeight="700"
          color={
            status === TransactionStatus.PENDING
              ? '#DDA25D'
              : value && value.toString() !== '0'
              ? 'success'
              : 'primary'
          }
        >
          {utils.formatEther(value || BigNumber.from('0'))} {tokenSymbol}
        </Heading>
        <Text fontSize="0.875rem" color="greys.4">
          {formatDate(date)}
        </Text>
      </Box>
      <Box display="flex" flexDirection="column">
        {pool && pool.title && (
          <Box>
            <Text fontWeight="bold" fontSize="0.875rem" color="greys.7" m={0.5}>
              Pool:
            </Text>
            <Text fontSize="0.875rem" color="greys.7" m={0.5}>
              {pool.title}
            </Text>
          </Box>
        )}
        {status && (
          <Box
            mt={2}
            display="flex"
            flexDirection={{ _: 'column', md: 'row', xl: 'row' }}
            justifyContent="space-between"
            gridGap={{ _: '1rem', md: '1rem' }}
          >
            <Box display="flex" flexDirection="column">
              <Text fontWeight="bold" fontSize="0.875rem" color="greys.7" m={0.5}>
                Status:
              </Text>
              <Box display="flex" flexDirection="row" gridGap="1rem" alignItems="center">
                {status === TransactionStatus.PENDING ? (
                  <PendingIcon />
                ) : (
                  <CheckMarkIcon color="#3E7E5C" />
                )}
                <Text fontSize="0.875rem" color="greys.7" m={0.5}>
                  {status}
                </Text>
              </Box>
            </Box>
            {buttonName && buttonAction && (
              <Button
                size="regular"
                onClick={buttonAction}
                variant={buttonName === 'Claim' ? 'success' : 'primary'}
              >
                {buttonName}
              </Button>
            )}
          </Box>
        )}
      </Box>
      <Box display="flex" flexDirection="column" py="1rem" gridGap="1rem">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent={{ xs: 'center', sm: 'center', md: 'start' }}
          gridGap="1rem"
          mt={4}
        >
          <Text color="greys.3" fontSize="1rem" fontWeight="400">
            Details (cumulative)
          </Text>
          {showImpressions ? (
            <UpIcon click={() => setShowImpression(!showImpressions)} />
          ) : (
            <DownIcon click={() => setShowImpression(!showImpressions)} />
          )}
        </Box>
        {impressions && showImpressions && <ImpressionsList impressions={impressions} pool={pool} />}
      </Box>
    </Box>
  );
};

export default Transaction;
