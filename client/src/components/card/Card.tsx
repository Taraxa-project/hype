import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import Button from '../button/Button';

interface CustomStyledProps {
  variant?: 'mobile' | 'desktop';
}

const StyledCard = styled.div<CustomStyledProps>`
  width: ${(props) => (props.variant === 'mobile' ? '19.375rem' : '23rem')};
  height: ${(props) => (props.variant === 'mobile' ? '21.938rem' : '24.438rem')};
  line-height: 1.25rem;
  display: flex;
  border-radius: 1rem;
  background: #f1f1f1;
  padding: 1%;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export const CardTitle = styled.h3`
  font-weight: 700;
  font-size: 0.875rem;
  color: #292929;
  width: 100%;
`;

export const CardDescription = styled.span`
  font-weight: 400;
  font-size: 0.875rem;
  color: #595959;
  width: 100%;
  min-height: 2rem;
  margin-bottom: 2%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const DataHeader = styled.span`
  width: 50%;
  align-items: left !important;
  font-weight: 700;
`;

export const DataValue = styled.span`
  width: 50%;
  align-items: left !important;
  font-weight: 400;
`;

export const DataContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

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
