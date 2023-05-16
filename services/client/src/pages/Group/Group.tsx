import SearchIcon from '../../assets/icons/Search';
import LoadingSpinner from '../../assets/icons/Spinner';
import { TelegramSubmitButton } from '../../components/button/TelegramSubmitGroupButton';
import Input from '../../components/input/Input';
import Box from '../../components/styles/Box';
import TGroup from '../../components/telegram-group/TGroup';
import TitleText from '../../components/titletext/TitleText';
import { TelegramGroup } from '../../models';
import { useGroupEffects } from './Group.effects';
import { GroupContainer, GroupSearch, TitleContainer } from './Group.styles';

export const Group = () => {
  const { debouncedResults, data, isFetchingNextPage } = useGroupEffects();
  return (
    <>
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
        {data?.pages.map(
          (data: TelegramGroup, i: number) =>
            data && <TGroup key={`${data.groupUsername}-${Date.now()}-${i}`} group={data} />,
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
