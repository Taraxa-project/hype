import CheckMarkIcon from '../../assets/icons/Check';
import PendingIcon from '../../assets/icons/Pending';
import { formatDate, TransactionStatus } from '../../utils';
import Button from '../button/Button';
import Box from '../styles/Box';
import Text from '../styles/Text';
import Heading from '../styles/Heading';
import { TransactionItem } from '../../pages/Redeem/Redeem.effects';

interface TransactionProps {
  value: number;
  pool?: string;
  status?: TransactionStatus;
  date: Date;
  buttonName?: string;
  buttonAction?: (transaction: any) => void;
}

const Transaction = ({ value, pool, status, date, buttonName, buttonAction }: TransactionProps) => {
  return (
    <Box backgroundColor="greys.0" p="1.313rem" borderRadius="16px">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb="1.5rem"
      >
        <Heading fontSize="20px" fontWeight="700" color={value > 0 ? 'success' : 'primary'}>
          {value}
        </Heading>
        <Text fontSize="14px" color="greys.4">
          {formatDate(date)}
        </Text>
      </Box>
      <Box display="flex" flexDirection="column">
        {pool && (
          <Box>
            <Text fontWeight="bold" fontSize="14px" color="greys.7" m={0.5}>
              Pool:
            </Text>
            <Text fontSize="14px" color="greys.7" m={0.5}>
              {pool}
            </Text>
          </Box>
        )}
        {status && (
          <Box
            mt={2}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" flexDirection="column">
              <Text fontWeight="bold" fontSize="14px" color="greys.7" m={0.5}>
                Status:
              </Text>
              <Box display="flex" flexDirection="row" gridGap="1rem" alignItems="center">
                {status === TransactionStatus.PENDING ? <PendingIcon /> : <CheckMarkIcon />}
                <Text fontSize="14px" color="greys.7" m={0.5}>
                  {status}
                </Text>
              </Box>
            </Box>
            {buttonName && buttonAction && (
              <Button size="regular" onClick={buttonAction}>
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
