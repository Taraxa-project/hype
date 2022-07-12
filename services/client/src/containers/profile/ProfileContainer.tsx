import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Box from '../../components/styles/Box';
import Text from '../../components/styles/Text';
import Blockies from 'react-blockies';
import { TelegramLogo } from 'src/assets/icons/Telegram';
import Button from 'src/components/button/Button';
import TelegramLoginButton, {
  TelegramLoginButtonSize,
} from '../../components/button/TelegramLoginButton';
import TelegramConfig from 'src/api/TelegramConfig';
import Heading from '../../components/styles/Heading';
import styled from 'styled-components';
import { HypeThemeType } from '../../theme';
import { TelegramUser } from 'src/models/HypeUser.model';
import { ConnectWalletBtn } from 'src/components/connect-wallet-btn/ConnectWalletBtn';

export const Account = styled.p<{ theme: HypeThemeType }>`
  font-weight: 600;
  font-size: 0.9rem;
  line-height: 1.625rem;
  color: ${({ theme }) => theme.colors.greys[14]};
  word-break: break-word;
`;

interface ProfileProps {
  address: string;
  telegramUsername: string;
  connect: (user: TelegramUser) => void;
  disconnect: (user: any) => void;
}

export const ProfileContainer = ({
  address,
  telegramUsername,
  connect,
  disconnect,
}: ProfileProps) => {
  const isMobile = useMediaQuery({ query: `(max-width: 1050px)` });
  return (
    <Box
      backgroundColor="greys.1"
      p={{ sm: '1.5rem', md: '2rem' }}
      borderRadius="2rem"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      flex="1 1 auto"
      alignItems="left"
      width={{ sm: 'unset', md: '100%' }}
      marginBottom="1rem"
      marginRight={{ sm: '1rem', md: 'none' }}
    >
      <Heading
        fontSize="1.25rem"
        fontWeight="700"
        lineHeight="1.625rem"
        color="black"
        letterSpacing="-0.02em"
      >
        Your profile
      </Heading>
      {address && (
        <Box display="flex" alignItems="center" maxWidth="300px" gridGap="1.5rem" my="1rem">
          <Blockies bgColor="#fff" scale={5} seed={address || 'current-user'} />
          <Account>{address}</Account>
        </Box>
      )}
      <Text color="greys.14" fontSize="0.875rem" fontWeight="600">
        Connected Apps:
      </Text>
      {address ? (
        <Box
          backgroundColor="greys.0"
          p="1.5rem"
          borderRadius="1rem"
          display="flex"
          flexDirection={{ _: 'column', sm: 'column', md: 'column', lg: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          gridGap="1.1rem"
          mt="0.75rem"
        >
          <Box display="flex" flexDirection="row">
            <TelegramLogo width="90" height="54.75" />
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
              {telegramUsername && (
                <Text fontSize="0.875rem" color="greys.4">
                  @{telegramUsername}
                </Text>
              )}
            </Box>
          </Box>
          {telegramUsername ? (
            <Button variant="secondary" size={isMobile ? 'small' : 'regular'} onClick={disconnect}>
              Disconnect this account
            </Button>
          ) : (
            <TelegramLoginButton
              botName={TelegramConfig.botName}
              cornerRadius={20}
              onAuthCallback={connect}
              buttonSize={isMobile ? TelegramLoginButtonSize.Medium : TelegramLoginButtonSize.Large}
              usePic
              lang="EN"
            />
          )}
        </Box>
      ) : (
        <ConnectWalletBtn size="full-width" />
      )}
    </Box>
  );
};
