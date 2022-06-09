import NotFoundIcon from '../../assets/icons/NotFound';
import Box from '../styles/Box';
import Text from '../styles/Text';
import { SpaceProps } from 'styled-system';

type NotConnectedMessageProps = SpaceProps;

export const NotConnectedMessage = ({ ...props }: NotConnectedMessageProps) => {
  return (
    <Box
      {...props}
      backgroundColor="greys.0"
      p="4.5rem"
      borderRadius="16px"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      gridGap="1.1rem"
    >
      <NotFoundIcon />
      <Text color="greys.8" fontSize="14px" lineHeight="22px" fontWeight="400">
        Connect wallet to see the history of rewards...
      </Text>
    </Box>
  );
};
