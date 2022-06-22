import { HypeIconBig } from '../../assets/icons/HypeIcon';
import SearchIcon from '../../assets/icons/Search';
import Input from '../../components/input/Input';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Home.css';
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
  VideoPlayer,
  LoadingContainer,
} from './Home.styled';

export const Home = () => {
  const { setTitleFilter, addMoreCards, filteredCards, cardData } = useHomeEffects();

  return (
    <>
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
          <VideoPlayer url="https://www.youtube.com/embed/E7wJTI-1dvQ" width="" height="" />
        </VideoContainer>
      </HeroContainer>
      <PoolContainer>
        <TitleText>Active Hype Pools</TitleText>
        <Input
          Icon={<SearchIcon />}
          placeholder="Search for hype pools..."
          onChange={(e) => setTitleFilter(e.target.value)}
        />
      </PoolContainer>
      {filteredCards.length > 0 ? (
        <InfiniteScroll
          className="cardContainer"
          dataLength={cardData.length}
          next={addMoreCards}
          hasMore={true}
          loader={
            <LoadingContainer>
              <LoadingSpinner />
            </LoadingContainer>
          }
          scrollableTarget="scrollableDiv"
        >
          {filteredCards}
        </InfiniteScroll>
      ) : (
        <NotFoundContainer>
          <NotFoundText>
            <NotFoundIcon /> Nothing found...
          </NotFoundText>
        </NotFoundContainer>
      )}
    </>
  );
};
