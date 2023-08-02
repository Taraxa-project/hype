import { HypePool } from '../../models';
import { getPoolDuration, shortenText, transformFromWei } from '../../utils';
import Button from '../button/Button';
import {
  StyledCard,
  CardTitle,
  CardDescription,
  DataHeader,
  DataValue,
  DataContainer,
  Container,
} from './Card.styled';
import DotIcon from '../../assets/icons/Dot';
import { useTokenDetails } from '../../hooks';
import { getStatusColor, getStatusDisplayName } from '../../utils/pools';

export interface CardProps {
  pool: HypePool;
  children?: JSX.Element | string;
  onClick?: () => void;
}

const Card = ({ children, ...props }: CardProps) => {
  const { pool, onClick } = props;
  const { title, projectName, description, cap, status, impressionReward, endDate } = pool;
  const { tokenDecimals, tokenSymbol } = useTokenDetails(pool);

  return (
    <StyledCard>
      <Container>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{shortenText(description)}</CardDescription>
        </div>
        <div>
          {projectName && (
            <DataContainer>
              <DataHeader>Project Name:</DataHeader>
              <DataValue> {shortenText(projectName, 20)}</DataValue>
            </DataContainer>
          )}
          {cap && (
            <DataContainer>
              <DataHeader>Pool:</DataHeader>
              <DataValue>
                {transformFromWei(cap, tokenDecimals)} {tokenSymbol}
              </DataValue>
            </DataContainer>
          )}
          {impressionReward && (
            <DataContainer>
              <DataHeader>Reward / impression:</DataHeader>
              <DataValue>
                {transformFromWei(impressionReward, tokenDecimals)} {tokenSymbol}
              </DataValue>
            </DataContainer>
          )}
          {endDate && (
            <DataContainer>
              <DataHeader>Time left:</DataHeader>
              <DataValue>
                {Number(endDate) !== 0 ? getPoolDuration(+endDate) : '(not yet active)'}
              </DataValue>
            </DataContainer>
          )}
          <DataContainer>
            <DataHeader>Status:</DataHeader>
            {status && (
              <DataValue>
                <DotIcon color={getStatusColor(status, endDate)} />{' '}
                {getStatusDisplayName(status, endDate)}
              </DataValue>
            )}
          </DataContainer>
        </div>
        <div>
          <Button size="full-width" onClick={onClick}>
            Learn more
          </Button>
        </div>
      </Container>
      {children}
    </StyledCard>
  );
};

Card.defaultProps = {
  variant: 'desktop',
};

export default Card;
