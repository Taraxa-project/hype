import { HypeIconBig } from '../../assets/icons/HypeIcon';
import SearchIcon from '../../assets/icons/Search';
import Input from '../../components/input/Input';
import LoadingSpinner from '../../assets/icons/Spinner';
import NotFoundIcon from 'src/assets/icons/NotFound';
import { useHomeEffects } from './Home.effects';
import {
  PageContainer,
  HeroContainer,
  IntroContainer,
  TitleText,
  DescriptionContainer,
  VideoContainer,
  PoolContainer,
  NotFoundContainer,
  NotFoundText,
  CardContainer,
} from './Home.styled';
import Card from '../../components/card/Card';
import Box from '../../components/styles/Box';

export const Home = () => {
  const { setSearchString, data, onClick, isFetchingNextPage } = useHomeEffects();

  return (
    <PageContainer>
      <HeroContainer>
        <IntroContainer>
          <HypeIconBig />
          <TitleText>What is hype farming?</TitleText>
          <DescriptionContainer>
            APE is launching it's testnet, and we'd like everyone to come & check it out! All
            participants will be able to claim rewards...
          </DescriptionContainer>
        </IntroContainer>
        <VideoContainer>
          <iframe
            src="https://www.youtube.com/embed/E7wJTI-1dvQ"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />{' '}
        </VideoContainer>
      </HeroContainer>
      <PoolContainer>
        <Input
          Icon={<SearchIcon />}
          placeholder="Search for hype pools..."
          onChange={(e) => setSearchString(e.target.value)}
        />
        <TitleText>Active Hype Pools</TitleText>
      </PoolContainer>
      <CardContainer>
        {data?.pages.map(
          (data, i) =>
            data && (
              <Card
                key={`${data.title}-${i}`}
                projectName={data.projectName}
                title={data.title}
                pool={data.pool}
                description={data.description}
                rewardsAddress={data.rewardsAddress}
                creatorAddress={data.creatorAddress}
                minReward={data.minReward}
                startDate={data.startDate}
                endDate={data.endDate}
                onClick={() => onClick(data)}
              />
            ),
        )}
      </CardContainer>
      {(isFetchingNextPage) && (
        <Box display="flex" justifyContent="center" alignItems="center" my={3}>
          <LoadingSpinner />
        </Box>
      )}
      {(!data || data?.pages?.length === 0) && (
        <NotFoundContainer>
          <NotFoundText>
            <NotFoundIcon /> Nothing found...
          </NotFoundText>
        </NotFoundContainer>
      )}
    </PageContainer>
  );
};
