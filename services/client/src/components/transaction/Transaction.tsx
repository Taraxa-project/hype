import CheckMarkIcon from '../../assets/icons/Check';
import PendingIcon from '../../assets/icons/Pending';
import { formatDate, TransactionStatus } from '../../utils';
import Button from '../button/Button';
import Box from '../styles/Box';
import Text from '../styles/Text';
import Heading from '../styles/Heading';
import { BigNumber, utils } from 'ethers';

export interface TransactionProps {
  value: BigNumber;
  symbol: string;
  pool?: string;
  status?: TransactionStatus;
  date: Date;
  buttonName?: string;
  buttonAction?: (transaction: any) => void;
}

const Transaction = ({
  value,
  pool,
  status,
  date,
  buttonName,
  buttonAction,
  symbol,
}: TransactionProps) => {
  return (
    <Box
      backgroundColor="greys.0"
      p="1.313rem"
      borderRadius="16px"
      maxWidth={{ _: 'none', lg: '28.99%', xl: '28.99%' }}
    >
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
          {utils.formatEther(value || BigNumber.from('0'))} {symbol}
        </Heading>
        <Text fontSize="0.875rem" color="greys.4">
          {formatDate(date)}
        </Text>
      </Box>
      <Box display="flex" flexDirection="column">
        {pool && (
          <Box>
            <Text fontWeight="bold" fontSize="0.875rem" color="greys.7" m={0.5}>
              Pool:
            </Text>
            <Text fontSize="0.875rem" color="greys.7" m={0.5}>
              {pool}
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
    </Box>
  );
};

export default Transaction;
