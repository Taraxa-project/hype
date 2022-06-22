import { HypeIconBig } from '../../assets/icons/HypeIcon';
import SearchIcon from '../../assets/icons/Search';
import Input from '../../components/input/Input';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Home.css';
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
} from './Home.styled';

export const Home = () => {
  const { setSearchString, addMoreCards, filteredCards, cardData } = useHomeEffects();

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
      {filteredCards?.length > 0 ? (
        <InfiniteScroll
          className="cardContainer"
          dataLength={cardData?.length}
          next={addMoreCards}
          hasMore={true}
          loader={
            <footer style={{ position: 'absolute', bottom: '0.5rem' }}>
              <LoadingSpinner />
            </footer>
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
    </PageContainer>
  );
};
