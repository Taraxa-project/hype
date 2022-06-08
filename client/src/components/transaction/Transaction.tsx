import { TransactionStatus } from '../../utils';
import Button from '../button/Button';
import {
  TransactionContainer,
  TransactionContent,
  TransactionDate,
  TransactionRow,
  TransactionHeader,
  TransactionText,
  TransactionValue,
  TransactionColumn,
} from './Transaction.styled';

interface TransactionProps {
  value: number;
  pool?: string;
  status?: TransactionStatus;
  date: Date;
  buttonName?: string;
  buttonAction?: () => {};
}

const Transaction = ({ value, pool, status, date, buttonName, buttonAction }: TransactionProps) => {
  return (
    <TransactionContainer>
      <TransactionHeader>
        <TransactionValue type={value > 0 ? 'positive' : 'negative'}>{value}</TransactionValue>
        <TransactionDate>{date?.toLocaleString()}</TransactionDate>
      </TransactionHeader>
      <TransactionContent>
        {pool && (
          <>
            <TransactionText isBold={true}>Pool:</TransactionText>
            <TransactionText isBold={false}>{pool}</TransactionText>
          </>
        )}
        {status && (
          <TransactionRow>
            <TransactionColumn>
              <TransactionText isBold={true}>Status:</TransactionText>
              <TransactionText isBold={false}>{status}</TransactionText>
            </TransactionColumn>
            {buttonName && buttonAction && (
              <Button size="regular" onClick={buttonAction}>
                {buttonName}
              </Button>
            )}
          </TransactionRow>
        )}
      </TransactionContent>
    </TransactionContainer>
  );
};

export default Transaction;
