import React from 'react';
import { useMediaQuery } from 'react-responsive';
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

export interface CardData {
  title?: string;
  description?: string;
  pool: number;
  poolToken: string;
  bonus: number;
  bonusToken: string;
  minReward: number;
  creatorAddress: string;
  rewardToken: string;
  duration?: string;
}

export interface CardProps extends React.ButtonHTMLAttributes<HTMLDivElement>, CardData {
  children?: JSX.Element | string;
  variant?: 'mobile' | 'desktop';
  onClick?: () => void;
}

const Card = ({ children, variant, ...props }: CardProps) => {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const {
    title,
    description,
    pool,
    poolToken,
    bonus,
    bonusToken,
    duration,
    minReward,
    rewardToken,
    onClick,
  } = props;
  return (
    <StyledCard variant={variant ? variant : isMobile ? 'mobile' : 'desktop'}>
      <Container>
        <CardTitle>{title}</CardTitle>
        <CardDescription key={`${description}-${Date.now()}`}>{description}</CardDescription>
        {pool && poolToken && (
          <DataContainer>
            <DataHeader key={`pool-${Date.now()}`}>Pool:</DataHeader>
            <DataValue key={`${pool}-${Date.now()}`}>
              {pool} {poolToken}
            </DataValue>
          </DataContainer>
        )}
        {bonus && bonusToken && (
          <DataContainer>
            <DataHeader key={`bonus-${Date.now()}`}>Bonus:</DataHeader>
            <DataValue key={`${bonus}-${Date.now()}`}>
              {bonus} {bonusToken}
            </DataValue>
          </DataContainer>
        )}
        {minReward && rewardToken && (
          <DataContainer>
            <DataHeader key={`min-${Date.now()}`}>Min reward:</DataHeader>
            <DataValue key={`${minReward}-${Date.now()}`}>
              {minReward} {rewardToken}
            </DataValue>
          </DataContainer>
        )}
        {duration && (
          <DataContainer>
            <DataHeader key={`duration-${Date.now()}`}>Duration:</DataHeader>
            <DataValue key={`${duration}-${Date.now()}`}>{duration}</DataValue>
          </DataContainer>
        )}
        <Button size="full-width" onClick={onClick}>
          Learn more
        </Button>
      </Container>
      {children}
    </StyledCard>
  );
};

Card.defaultProps = {
  variant: 'desktop',
};

export default Card;
