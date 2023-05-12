import SearchIcon from '../../assets/icons/Search';
import LoadingSpinner from '../../assets/icons/Spinner';
import Input from '../../components/input/Input';
import Box from '../../components/styles/Box';
import TGroup from '../../components/telegram-group/TGroup';
import TitleText from '../../components/titletext/TitleText';
import { useGroupEffects } from './Group.effects';
import { GroupContainer, GroupSearch } from './Group.styles';

export const Group = () => {
  const { debouncedResults, data, isFetchingNextPage } = useGroupEffects();
  return (
    <>
      <GroupSearch>
        <TitleText>📋 List of Indexed Telegram Groups</TitleText>
        <Input
          icon={<SearchIcon />}
          placeholder="Search for telegram groups..."
          onChange={debouncedResults}
        />
      </GroupSearch>
      <GroupContainer>
        {data?.pages.map(
          (data) => data && <TGroup key={`${data.groupUsername}-${Date.now()}`} group={data} />,
        )}
      </GroupContainer>
      {isFetchingNextPage && (
        <Box display="flex" justifyContent="center" alignItems="center" my={3}>
          <LoadingSpinner />
        </Box>
      )}
    </>
  );
};
