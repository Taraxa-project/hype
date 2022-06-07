import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Button from '../button/Button';
import {
  StyledCard,
  Container,
  CardTitle,
  CardDescription,
  DataContainer,
  DataHeader,
  DataValue,
} from './Card.styled';

export interface CardProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  children?: JSX.Element | string;
  variant?: 'mobile' | 'desktop';
  title?: string;
  description?: string;
  poolAmount?: number;
  poolToken?: string;
  bonusAmount?: number;
  bonusToken?: string;
  minRewardAmount?: number;
  minRewardToken?: string;
  duration?: string;
}

const Card = ({ children, variant, ...props }: CardProps) => {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const {
    title,
    description,
    poolAmount,
    poolToken,
    bonusAmount,
    bonusToken,
    duration,
    minRewardAmount,
    minRewardToken,
  } = props;
  return (
    <StyledCard variant={variant ? variant : isMobile ? 'mobile' : 'desktop'} {...props}>
      <Container>
        <CardTitle>{title}</CardTitle>
        <CardDescription key={`${description}-${Date.now()}`}>{description}</CardDescription>
        {poolAmount && poolToken && (
          <DataContainer>
            <DataHeader key={`pool-${Date.now()}`}>Pool:</DataHeader>
            <DataValue key={`${poolAmount}-${Date.now()}`}>
              {poolAmount} {poolToken}
            </DataValue>
          </DataContainer>
        )}
        {bonusAmount && bonusToken && (
          <DataContainer>
            <DataHeader key={`bonus-${Date.now()}`}>Bonus:</DataHeader>
            <DataValue key={`${bonusAmount}-${Date.now()}`}>
              {bonusAmount} {bonusToken}
            </DataValue>
          </DataContainer>
        )}
        {minRewardAmount && minRewardToken && (
          <DataContainer>
            <DataHeader key={`min-${Date.now()}`}>Min reward:</DataHeader>
            <DataValue key={`${minRewardAmount}-${Date.now()}`}>
              {minRewardAmount} {minRewardToken}
            </DataValue>
          </DataContainer>
        )}
        {duration && (
          <DataContainer>
            <DataHeader key={`duration-${Date.now()}`}>Duration:</DataHeader>
            <DataValue key={`${duration}-${Date.now()}`}>{duration}</DataValue>
          </DataContainer>
        )}
        <Button size="full-width">Learn more</Button>
      </Container>
      {children}
    </StyledCard>
  );
};

Card.defaultProps = {
  variant: 'desktop',
};

export default Card;
