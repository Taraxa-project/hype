import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Box from '../../components/styles/Box';
import Text from '../../components/styles/Text';
import { DataHeader, DataValue } from '../../components/card/Card.styled';
import {
  BlockiesContainer,
  Account,
} from '../modals/card-details/CardDetails.styled';
import Blockies from 'react-blockies';
import { TelegramLogo } from 'src/assets/icons/Telegram';
import Button from 'src/components/button/Button';
import TLoginButton, { TLoginButtonSize, TUser } from '../../components/button/TelegramLoginButton';
import TelegramConfig from 'src/api/TelegramConfig';

interface ProfileProps {
  address: string;
  telegramUsername: string;
  connect: (user: TUser) => void;
  disconnect: (user: any) => void;
}

export const ProfileContainer = ({
  address,
  telegramUsername,
  connect,
  disconnect,
}: ProfileProps) => {
  const isMobile = useMediaQuery({ query: `(max-width: 950px)` });
  return (
    <Box
      backgroundColor="greys.1"
      p={isMobile ? '1.5rem' : '4.5rem'}
      borderRadius="1rem"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="left"
      width={isMobile ? 'none' : '100%'}
      marginBottom="1rem"
      marginRight={isMobile ? '1rem' : 'none'}
    >
      <DataHeader>Your profile</DataHeader>
      <BlockiesContainer>
        <Box marginLeft="1rem">
          <Blockies seed="Jeremy" />
        </Box>
        <Account>{address}</Account>
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
              @{telegramUsername}
            </Text>
          </Box>
        </Box>
        {telegramUsername ? (
          <Button variant="secondary" size={isMobile ? 'small' : 'regular'} onClick={disconnect}>
            Disconnect this account
          </Button>
        ) : (
          <TLoginButton
            botName={TelegramConfig.botName}
            onAuthCallback={connect}
            buttonSize={isMobile ? TLoginButtonSize.Small : TLoginButtonSize.Medium}
            usePic={false}
            lang="EN"
          />
        )}
      </Box>
    </Box>
  );
};
