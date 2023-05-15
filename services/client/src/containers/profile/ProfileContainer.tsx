import styled from 'styled-components';
import Box from '../../components/styles/Box';
import Text from '../../components/styles/Text';
import Blockies from 'react-blockies';
import TelegramLoginButton, {
  TelegramLoginButtonSize,
} from '../../components/button/TelegramLoginButton';
import Heading from '../../components/styles/Heading';
import { HypeThemeType } from '../../theme';
import { TelegramUser } from '../../models';
import Button from '../../components/button/Button';
import { TelegramLogo } from '../../assets/icons/Telegram';
import { TelegramBotName } from '../../constants';

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
  return (
    <Box
      backgroundColor="greys.1"
      p={{ _: '1.5rem', sm: '1.5rem', md: '2rem' }}
      borderRadius="10px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      flex="1 1 auto"
      alignItems="left"
      width={{ _: 'unset', sm: 'unset', md: '100%' }}
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
        <Box display="flex" alignItems="center" gridGap="1.5rem" my="1rem">
          <Blockies bgColor="#fff" scale={5} seed={address || 'current-user'} />
          <Account>{address}</Account>
        </Box>
      )}
      <Text color="greys.14" fontSize="0.875rem" fontWeight="600">
        Connected Apps:
      </Text>
      <Box
        backgroundColor="greys.0"
        p="1.5rem"
        borderRadius="10px"
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
                {telegramUsername}
              </Text>
            )}
          </Box>
        </Box>
        {telegramUsername ? (
          <Button variant="secondary" onClick={disconnect}>
            Disconnect this account
          </Button>
        ) : (
          <TelegramLoginButton
            botName={TelegramBotName}
            cornerRadius={20}
            onAuthCallback={connect}
            buttonSize={TelegramLoginButtonSize.Medium}
            usePic
            lang="EN"
          />
        )}
      </Box>
    </Box>
  );
};
