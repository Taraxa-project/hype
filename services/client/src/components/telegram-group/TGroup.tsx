import { TelegramGroup } from '../../models';
import Box from '../styles/Box';
import Text from '../styles/Text';
import { StyledGroup } from './TGroup.styles';

export interface TGroupProps {
  group: TelegramGroup;
}
const TGroup = ({ group }: TGroupProps) => {
  return (
    <StyledGroup>
      <Box display="flex" flexDirection="column">
        <Text fontWeight="bold" fontSize="0.875rem" color="greys.7" m={0.5}>
          Username:
        </Text>
        <Text fontSize="0.875rem" color="greys.7" m={0.5}>
          {group.groupUsername}
        </Text>
      </Box>
      <Box display="flex" flexDirection="column">
        <Text fontWeight="bold" fontSize="0.875rem" color="greys.7" m={0.5}>
          Title:
        </Text>
        <Text fontSize="0.875rem" color="greys.7" m={0.5}>
          {group.groupTitle}
        </Text>
      </Box>
      <Box display="flex" flexDirection="column">
        <Text fontWeight="bold" fontSize="0.875rem" color="greys.7" m={0.5}>
          Created at:
        </Text>
        <Text fontSize="0.875rem" color="greys.7" m={0.5}>
          {group.createdAt ? new Date(group.createdAt).toDateString() : 'NA'}
        </Text>
      </Box>
    </StyledGroup>
  );
};

export default TGroup;
