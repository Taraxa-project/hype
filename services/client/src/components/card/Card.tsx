import React from 'react';
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
import { useNetwork, useToken } from 'wagmi';
import SuccessIcon from '../../assets/icons/Success';
import ErrorIcon from '../../assets/icons/Error';

export interface CardProps extends HypePool {
  children?: JSX.Element | string;
  onClick?: () => void;
}

const Card = ({ children, ...props }: CardProps) => {
  const { title, description, token, cap, active, minReward, endDate, projectName, onClick } =
    props;
  const { chain } = useNetwork();
  const { data: poolTokenInfo } = useToken({ address: token, enabled: chain?.name === 'Ethereum' });
  const poolToken = poolTokenInfo?.symbol;
  const duration = `${monthDiff(new Date(), endDate)} months left`;

  return (
    <StyledCard>
      <Container>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription key={`${description}-${Date.now()}`}>
            {shortenText(description)}
          </CardDescription>
          {projectName && (
            <DataContainer>
              <DataHeader>Project Name:</DataHeader>
              <DataValue>{projectName}</DataValue>
            </DataContainer>
          )}
          {cap && (
            <DataContainer>
              <DataHeader key={`pool-${Date.now()}`}>Pool:</DataHeader>
              <DataValue key={`${cap}-${Date.now()}`}>
                {cap} {poolToken}
              </DataValue>
            </DataContainer>
          )}
          {minReward && (
            <DataContainer>
              <DataHeader key={`min-${Date.now()}`}>Min reward:</DataHeader>
              <DataValue key={`${minReward}-${Date.now()}`}>
                {minReward} {poolToken}
              </DataValue>
            </DataContainer>
          )}
          {endDate && duration && (
            <DataContainer>
              <DataHeader key={`duration-${Date.now()}`}>Duration:</DataHeader>
              <DataValue key={`${duration}-${Date.now()}`}>{duration}</DataValue>
            </DataContainer>
          )}
          <DataContainer>
            <DataHeader>Active:</DataHeader>
            {active ? (
              <DataValue key={`active-${Date.now()}`}>
                <SuccessIcon />
              </DataValue>
            ) : (
              <DataValue key={`active-${Date.now()}`}>
                <ErrorIcon />
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
