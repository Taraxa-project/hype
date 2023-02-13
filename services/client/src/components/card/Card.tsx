import React from 'react';
import { HypePool } from '../../models';
import { monthDiff, shortenText, transformFromWei } from '../../utils';
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
  const { title, projectName, description, tokenName, cap, active, impressionReward, endDate } =
    pool;
  const { tokenDecimals } = useTokenDecimals(pool);
  const duration = `${monthDiff(new Date(), new Date(+endDate))} months left`;

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
              <DataValue> {shortenText(projectName, 20)}</DataValue>
            </DataContainer>
          )}
          {cap && (
            <DataContainer>
              <DataHeader key={`pool-${Date.now()}`}>Pool:</DataHeader>
              <DataValue key={`${cap}-${Date.now()}`}>
                {transformFromWei(cap, tokenDecimals)} {tokenName}
              </DataValue>
            </DataContainer>
          )}
          {impressionReward && (
            <DataContainer>
              <DataHeader key={`min-${Date.now()}`}>Impressions reward:</DataHeader>
              <DataValue key={`${impressionReward}-${Date.now()}`}>
                {transformFromWei(impressionReward, tokenDecimals)} {tokenName}
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
            <DataHeader>Status:</DataHeader>
            {active ? (
              <DataValue key={`active-${Date.now()}`}>
                <DotIcon color="#15AC5B" /> Active
              </DataValue>
            ) : (
              <DataValue key={`active-${Date.now()}`}>
                <DotIcon color="#C2C2C2" /> Inactive
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
