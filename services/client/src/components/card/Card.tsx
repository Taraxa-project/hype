import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { HypePool } from '../../models';
import { monthDiff, shortenText } from '../../utils';
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
import { useToken } from 'wagmi';

export interface CardProps extends HypePool {
  children?: JSX.Element | string;
  variant?: 'mobile' | 'desktop';
  onClick?: () => void;
}

const Card = ({ children, variant, ...props }: CardProps) => {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const { title, description, rewardsAddress, pool, minReward, startDate, endDate, onClick } =
    props;
  const {
    data: poolTokenInfo,
    isError: poolTokenIsError,
    isLoading: poolTokenIsLoading,
  } = useToken({ address: rewardsAddress });
  const poolToken = poolTokenInfo?.symbol;
  const duration = `${monthDiff(startDate, endDate)} months left`;

  return (
    <StyledCard variant={variant ? variant : isMobile ? 'mobile' : 'desktop'}>
      <Container>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription key={`${description}-${Date.now()}`}>{shortenText(description)}</CardDescription>
          {pool && poolToken && (
            <DataContainer>
              <DataHeader key={`pool-${Date.now()}`}>Pool:</DataHeader>
              <DataValue key={`${pool}-${Date.now()}`}>
                {pool} {poolToken}
              </DataValue>
            </DataContainer>
          )}
          {minReward && poolToken && (
            <DataContainer>
              <DataHeader key={`min-${Date.now()}`}>Min reward:</DataHeader>
              <DataValue key={`${minReward}-${Date.now()}`}>
                {minReward} {poolToken}
              </DataValue>
            </DataContainer>
          )}
          {startDate && endDate && duration && (
            <DataContainer>
              <DataHeader key={`duration-${Date.now()}`}>Duration:</DataHeader>
              <DataValue key={`${duration}-${Date.now()}`}>{duration}</DataValue>
            </DataContainer>
          )}
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
