import NotFoundIcon from '../../assets/icons/NotFound';
import Box from '../styles/Box';
import Text from '../styles/Text';
import { SpaceProps } from 'styled-system';

export type NotAvailableProps = SpaceProps & {
  message?: string;
};

export const NotAvailable = ({ ...props }: NotAvailableProps) => {
  return (
    <Box
      {...props}
      backgroundColor="greys.0"
      p={{ _: '2rem', md: '4.5rem' }}
      borderRadius="10px"
      display="flex"
      flexDirection={{ _: 'column', md: 'row' }}
      justifyContent="center"
      alignItems="center"
      gridGap="1.1rem"
    >
      <NotFoundIcon />
      <Text color="greys.8" fontSize="0.875rem" lineHeight="22px" fontWeight="400">
        {props.message || 'Connect wallet to see the history of rewards...'}
      </Text>
    </Box>
  );
};
