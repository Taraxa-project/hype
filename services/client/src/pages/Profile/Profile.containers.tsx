import React from 'react';
import { useMediaQuery } from 'react-responsive';
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
import TLoginButton, { TLoginButtonSize } from 'src/components/button/TelegramLoginButton';
import { useProfileEffects } from './Profile.effects';
import TelegramConfig from 'src/api/TelegramConfig';

interface ProfileProps {
  address: string;
  telegramUsername: string;
}

export const ProfileContainer = (props: ProfileProps) => {
  const isMobile = useMediaQuery({ query: `(max-width: 950px)` });
  const {connect, disconnect } = useProfileEffects();
  return (
    <Box
      backgroundColor="greys.1"
      p={isMobile ? '1.5rem' : '4.5rem'}
      borderRadius="1rem"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="left"
      width={isMobile ? 'none' : '65%'}
      marginBottom="1rem"
      marginRight={isMobile ? '1rem' : 'none'}
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
        backgroundColor="greys.0"
        p="1.5rem"
        borderRadius="1rem"
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
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
            width="100%"
          >
            <Text fontWeight="bold" fontSize="0.875rem" color="greys.7" m={0.5}>
              Telegram:
            </Text>
            <Text fontSize="0.875rem" color="greys.4">
              @{props.telegramUsername}
            </Text>
          </Box>
        </Box>
        {props.telegramUsername ? (
          <Button variant="neutral" size={isMobile ? 'small' : 'regular'} onClick={disconnect}>
            Disconnect this account
          </Button>
        ) : (
          <TLoginButton botName={TelegramConfig.botName} onAuthCallback={connect} buttonSize={isMobile ? TLoginButtonSize.Small : TLoginButtonSize.Medium} usePic={false} lang='EN'/>
        )}
      </Box>
    </Box>
  );
};

interface RewardProps {
  rewardAmount: number;
  onRedeem: () => void;
}

export const RewardsContainer = (props: RewardProps) => {
  const { isConnected } = useMetamask();
  const isMobile = useMediaQuery({ query: `(max-width: 950px)` });
  return (
    <Box
      p={isMobile ? '1.5rem' : '4.5rem'}
      borderRadius="1rem"
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      backgroundColor="greys.1"
      marginLeft={isMobile ? 'none' : '1rem'}
      marginRight={isMobile ? '1rem' : 'none'}
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
      <Button
        variant={
          isConnected && props.rewardAmount && props.rewardAmount > 0 ? 'primary' : 'neutral'
        }
        size="small"
        onClick={props.onRedeem}
        disabled={!isConnected}
      >
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
  const isMobile = useMediaQuery({ query: `(max-width: 950px)` });
  return (
    <Box
      p="1rem"
      borderRadius="1rem"
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      backgroundColor="greys.1"
      marginBottom="1rem"
      marginRight={isMobile ? '1rem' : 'none'}
    >
      {hasMore ? (
        <Box
          borderRadius="1rem"
          display="flex"
          flexDirection="row"
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
        >
          {props.title}
        </Heading>
      )}
      <Box
        borderRadius="1rem"
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        justifyContent="space-evenly"
        backgroundColor={props.cards.length > 0 ? 'greys.1' : 'greys.0'}
      >
        {props.cards.length > 0 ? (
          props.cards.slice(0, props.show).map((data, i) => (
            <Card
              variant={isMobile ? 'mobile' : 'desktop'}
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
