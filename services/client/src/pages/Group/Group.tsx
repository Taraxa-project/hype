import SearchIcon from '../../assets/icons/Search';
import LoadingSpinner from '../../assets/icons/Spinner';
import { TelegramSubmitButton } from '../../components/button/TelegramSubmitGroupButton';
import { RoundContainer } from '../../components/container/RoundContainer.styled';
import Input from '../../components/input/Input';
import Box from '../../components/styles/Box';
import Table from '../../components/table/Table';
import TitleText from '../../components/titletext/TitleText';
import { useGroupEffects } from './Group.effects';
import { GroupContainer, GroupSearch, TitleContainer } from './Group.styles';

export const Group = () => {
  const { columns, rows, debouncedResults, isFetchingNextPage } = useGroupEffects();
  return (
    <RoundContainer>
      <GroupSearch>
        <TitleContainer>
          <TitleText>📋 List of Indexed Telegram Groups</TitleText>
          <div>
            <TelegramSubmitButton />
          </div>
        </TitleContainer>
        <Input
          icon={<SearchIcon />}
          placeholder="Search for telegram groups..."
          onChange={debouncedResults}
        />
      </GroupSearch>
      <GroupContainer>
        <Table columns={columns} rows={rows} />
      </GroupContainer>
      {isFetchingNextPage && (
        <Box display="flex" justifyContent="center" alignItems="center" my={3}>
          <LoadingSpinner />
        </Box>
      )}
    </RoundContainer>
  );
};
