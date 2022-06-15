import React from 'react';
import styled from 'styled-components';
import { HypeThemeType } from '../../theme';
import Box from '../../components/styles/Box';
import Text from '../../components/styles/Text';
import Heading from '../../components/styles/Heading';
import { DataHeader, DataValue } from '../../components/card/Card.styled';
import {
  BlockiesContainer,
  Account,
} from '../../containers/modals/card-details/CardDetails.styled';
import Blockies from 'react-blockies';
import { TelegramLogo } from 'src/assets/icons/Telegram';
import Button from 'src/components/button/Button';
import useMetamask from 'src/hooks/useMetamask';
import { formatNumber } from '../../utils';
import { CardData } from 'src/components/card/Card';
import Card from 'src/components/card/Card';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { NotAvailable } from '../../components/not-available/NotAvailable';
import { Link } from 'src/components/styles/Link';

export const StyledContainerRow = styled.div<{ theme: HypeThemeType }>`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 1rem;
  min-height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: row;
`;

export const StyledContainerColumn = styled.div<{ theme: HypeThemeType }>`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 1rem;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

interface ProfileProps {
  address: string;
  telegramUsername: string;
}

export const ProfileContainer = (props: ProfileProps) => (
  <Box
    backgroundColor="greys.1"
    p="4.5rem"
    borderRadius="1rem"
    display="flex"
    flexDirection="column"
    justifyContent="space-evenly"
    alignItems="left"
    gridGap="1.1rem"
    width="65%"
    marginBottom="1rem"
  >
    <DataHeader>Your profile</DataHeader>
    <BlockiesContainer>
      <Box marginLeft="1rem">
        <Blockies seed="Jeremy" />
      </Box>
      <Account>{props.address}</Account>
    </BlockiesContainer>
    <DataValue>Connected Apps:</DataValue>
    <Box
      backgroundColor="#DCDCDC"
      p="1.5rem"
      borderRadius="1rem"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      gridGap="1.1rem"
    >
      <Box display="flex" flexDirection="row">
        <TelegramLogo />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
          alignItems="center"
          marginLeft="1rem"
        >
          <Text fontWeight="bold" fontSize="0.875rem" color="greys.7" m={0.5}>
            Telegram:
          </Text>
          <Text fontSize="0.875rem" color="greys.4">
            @{props.telegramUsername}
          </Text>
        </Box>
      </Box>
      <Button variant="neutral" size="regular">
        Disconnect this account
      </Button>
    </Box>
  </Box>
);

interface RewardProps {
  rewardAmount: number;
  onRedeem: () => void;
}

export const RewardsContainer = (props: RewardProps) => {
  const { status } = useMetamask();
  const isConnected = status === 'connected';
  return (
    <Box
      p="3.5rem"
      borderRadius="1rem"
      display="flex"
      flexDirection="column"
      width="30%"
      justifyContent="space-evenly"
      backgroundColor="greys.1"
      marginLeft="1rem"
      marginBottom="1rem"
    >
      <Heading
        fontSize="1.25rem"
        fontWeight="700"
        lineHeight="1.625rem"
        color="black"
        letterSpacing="-0.02em"
      >
        Redeem rewards
      </Heading>
      <Text pt="2rem" color="greys.2" fontSize="1rem" fontWeight="700">
        Total unredeemed
      </Text>
      <Heading
        fontSize="2.25rem"
        fontWeight="700"
        lineHeight="2.75rem"
        color="black"
        letterSpacing="-0.02em"
      >
        {isConnected ? `${formatNumber(props.rewardAmount)} TARA` : `N/A`}
      </Heading>
      <Button variant="neutral" size="small" onClick={props.onRedeem} disabled={!isConnected}>
        Redeem all
      </Button>
    </Box>
  );
};

export const CardContainer = (props: {
  show: number;
  title: string;
  cards: CardData[];
  emptyMessage: string;
  target: string;
}) => {
  const dispatchModals = useModalsDispatch();
  const hasMore = props.cards.length > props.show;
  return (
    <Box
      p="3rem"
      borderRadius="1rem"
      display="flex"
      flexDirection="column"
      width="93%"
      justifyContent="space-evenly"
      backgroundColor="greys.1"
      marginBottom="1rem"
    >
      {hasMore ? (
        <Box
          p="3rem"
          borderRadius="1rem"
          display="flex"
          flexDirection="row"
          width="93%"
          justifyContent="space-between"
          backgroundColor="greys.1"
          marginBottom="1rem"
        >
          <Heading
            fontSize="1.25rem"
            fontWeight="700"
            lineHeight="1.625rem"
            color="black"
            letterSpacing="-0.02em"
            width="90%"
          >
            {props.title}
          </Heading>
          <Link target={props.target} text="See all ->" />
        </Box>
      ) : (
        <Heading
          fontSize="1.25rem"
          fontWeight="700"
          lineHeight="1.625rem"
          color="black"
          letterSpacing="-0.02em"
          width="90%"
        >
          {props.title}
        </Heading>
      )}
      <Box
        p="3rem"
        borderRadius="1rem"
        display="flex"
        flexDirection="row"
        width="93%"
        justifyContent="space-evenly"
        backgroundColor={ props.cards.length > 0 ? "greys.1": "greys.0" }
      >
        {props.cards.length > 0 ? (
          props.cards.slice(0, props.show).map((data, i) => (
            <Card
              key={`${data.title}-${i}`}
              title={data.title}
              pool={data.pool}
              description={data.description}
              poolToken={data.poolToken}
              bonus={data.bonus}
              creatorAddress={data.creatorAddress}
              bonusToken={data.bonusToken}
              duration={data.duration}
              minReward={data.minReward}
              rewardToken={data.rewardToken}
              onClick={() => {
                dispatchModals({
                  type: ModalsActionsEnum.SHOW_CARD_DETAILS,
                  payload: {
                    open: true,
                    cardData: props.cards[i],
                  },
                });
              }}
            />
          ))
        ) : (
          <NotAvailable message={props.emptyMessage} />
        )}
      </Box>
    </Box>
  );
};
