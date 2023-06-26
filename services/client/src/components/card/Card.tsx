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
import { useTokenDecimals } from '../../hooks';

export interface CardProps {
  pool: HypePool;
  children?: JSX.Element | string;
  onClick?: () => void;
}

const Card = ({ children, ...props }: CardProps) => {
  const { pool, onClick } = props;
  const { title, projectName, description, cap, active, impressionReward, endDate } =
    pool;
  const { tokenDecimals, tokenSymbol } = useTokenDecimals(pool);

  return (
    <StyledCard>
      <Container>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription key={`${description}-${Date.now()}`}>
            {shortenText(description)}
          </CardDescription>
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
              <DataHeader key={`pool-${Date.now()}`}>Pool:</DataHeader>
              <DataValue key={`${cap}-${Date.now()}`}>
                {transformFromWei(cap, tokenDecimals)} {tokenSymbol}
              </DataValue>
            </DataContainer>
          )}
          {impressionReward && (
            <DataContainer>
              <DataHeader key={`min-${Date.now()}`}>Reward / impression:</DataHeader>
              <DataValue key={`${impressionReward}-${Date.now()}`}>
                {transformFromWei(impressionReward, tokenDecimals)} {tokenSymbol}
              </DataValue>
            </DataContainer>
          )}
          {endDate && (
            <DataContainer>
              <DataHeader key={`endDate-${Date.now()}`}>Duration:</DataHeader>
              <DataValue key={`${endDate}-${Date.now()}`}>
                {Number(endDate) !== 0 ? getPoolDuration(+endDate) : '(not yet active)'}
              </DataValue>
            </DataContainer>
          )}
          <DataContainer>
            <DataHeader>Status:</DataHeader>
            {active ? (
              <DataValue key={`active-${Date.now()}`}>
                <DotIcon color="#15AC5B" /> Active
              </DataValue>
            ) : (
              <DataValue key={`active-${Date.now()}`}>
                <DotIcon color="#C2C2C2" /> (not yet active)
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
