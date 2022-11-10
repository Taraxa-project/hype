import { HypeIconBig } from '../../assets/icons/HypeIcon';
import SearchIcon from '../../assets/icons/Search';
import Input from '../../components/input/Input';
import LoadingSpinner from '../../assets/icons/Spinner';
import NotFoundIcon from 'src/assets/icons/NotFound';
import { useHomeEffects } from './Home.effects';
import {
  HeroContainer,
  IntroContainer,
  TitleText,
  DescriptionContainer,
  VideoContainer,
  PoolContainer,
  NotFoundContainer,
  NotFoundText,
  CardContainer,
  VideoPlayer,
  Logo,
  LogoText,
} from './Home.styled';
import Card from '../../components/card/Card';
import Box from '../../components/styles/Box';
import { HypePool } from '../../models';

export const Home = () => {
  const { debouncedResults, hypePools, onClick, isFetchingNextPage } = useHomeEffects();

  return (
    <>
      <HeroContainer>
        <IntroContainer>
          {/* <HypeIconBig /> */}
          <Logo>
            📣 <LogoText>Hype</LogoText>
          </Logo>
          <TitleText>What is hype farming?</TitleText>
          <DescriptionContainer>
            APE is launching it's testnet, and we'd like everyone to come & check it out! All
            participants will be able to claim rewards...
          </DescriptionContainer>
        </IntroContainer>
        <VideoContainer>
          <VideoPlayer
            url="https://www.youtube.com/embed/E7wJTI-1dvQ"
            width=""
            height=""
            controls={true}
          />
        </VideoContainer>
      </HeroContainer>
      <PoolContainer>
        <TitleText>Active Hype Pools</TitleText>
        <Input
          icon={<SearchIcon />}
          placeholder="Search for hype pools..."
          onChange={debouncedResults}
        />
      </PoolContainer>
      {hypePools?.length > 0 && (
        <CardContainer>
          {hypePools?.map(
            (data: HypePool, i: number) =>
              data && (
                <Card
                  key={`${data.title}-${i}`}
                  id={data.id}
                  projectName={data.projectName}
                  title={data.title}
                  cap={data.cap}
                  description={data.description}
                  token={data.token}
                  creator={data.creator}
                  minReward={data.minReward}
                  active={data.active}
                  endDate={data.endDate}
                  onClick={() => onClick(data)}
                />
              ),
          )}
        </CardContainer>
      )}
      {isFetchingNextPage && (
        <Box display="flex" justifyContent="center" alignItems="center" my={3}>
          <LoadingSpinner />
        </Box>
      )}
      {(!hypePools || hypePools?.length === 0) && (
        <NotFoundContainer>
          <NotFoundText>
            <NotFoundIcon /> Nothing found...
          </NotFoundText>
        </NotFoundContainer>
      )}
    </>
  );
};
