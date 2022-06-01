import React, { useEffect, useState } from 'react';
import { HypeIconBig } from '../../assets/icons/HypeIcon';
import SearchIcon from '../../assets/icons/Search';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import Input from '../../components/input/Input';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Home.css';
import LoadingSpinner from '../../assets/icons/Spinner';
import styled from 'styled-components';
import NotFoundIcon from 'src/assets/icons/NotFount';

const PageContainer = styled.div`
  background: #fafafa;
  border-radius: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeroContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  justify-content: space-between;
  margin-top: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  justify-content: center;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  align-items: right;
`;

const PoolContainer = styled.div`
  display: flex;
  flex-direction: inherit;
  margin-top: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;

const NotFoundContainer = styled.div`
  min-height: 12rem;
  margin-top: 2rem;
  margin-left: 3rem;
  margin-right: 3rem;
  background: #f1f1f1;
  border-radius: 1rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

const NotFoundText = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 1.5rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  letter-spacing: -0.03em;

  color: #a6a6a6;
`;

const DescriptionContainer = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  letter-spacing: -0.02em;
  text-align: left;
  color: #595959;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-width: 15rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TitleText = styled.h3`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.625rem;

  display: flex;
  align-items: center;
  letter-spacing: -0.02em;

  color: #000000;
`;

interface CardData {
  title: string;
  description?: string;
  pool: number;
  poolToken: string;
  bonus: number;
  bonusToken: string;
  minReward: number;
  rewardToken: string;
  startDate: Date;
  endDate: Date;
}

const Home = () => {
  const [cardData, setCardData] = useState<CardData[]>([{}] as CardData[]);
  const [titleFilter, setTitleFilter] = useState('');

  useEffect(() => {
    setCardData([
      {
        title: 'ApeCoin Staking Launch!',
        description:
          'APE is launching it’s testnet, and we’d like everyone to come & check it out! All participants will be able to claim rewards as loooooooong All participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongvvvAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongv',
        pool: 100000,
        poolToken: 'APE',
        bonus: 12000,
        bonusToken: 'TARA',
        minReward: 1,
        rewardToken: 'APE',
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        title: 'ApeCoin Staking Launch!',
        description:
          'APE is launching it’s testnet, and we’d like everyone to come & check it out! All participants will be able to claim rewards as loooooooong All participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongvvvAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongv',
        pool: 100000,
        poolToken: 'APE',
        bonus: 12000,
        bonusToken: 'TARA',
        minReward: 1,
        rewardToken: 'APE',
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        title: 'ApeCoin Staking Launch!',
        description:
          'APE is launching it’s testnet, and we’d like everyone to come & check it out! All participants will be able to claim rewards as loooooooong All participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongvvvAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongv',
        pool: 100000,
        poolToken: 'APE',
        bonus: 12000,
        bonusToken: 'TARA',
        minReward: 1,
        rewardToken: 'APE',
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        title: 'ApeCoin Staking Launch!',
        description:
          'APE is launching it’s testnet, and we’d like everyone to come & check it out! All participants will be able to claim rewards as loooooooong All participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongvvvAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongv',
        pool: 100000,
        poolToken: 'APE',
        bonus: 12000,
        bonusToken: 'TARA',
        minReward: 1,
        rewardToken: 'APE',
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        title: 'ApeCoin Staking Launch!',
        description:
          'APE is launching it’s testnet, and we’d like everyone to come & check it out! All participants will be able to claim rewards as loooooooong All participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongvvvAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongv',
        pool: 100000,
        poolToken: 'APE',
        bonus: 12000,
        bonusToken: 'TARA',
        minReward: 1,
        rewardToken: 'APE',
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
    ]);
  }, []);

  const addMoreCards = () => {
    setTimeout(() => {
      const currCards = cardData;
      setCardData(currCards.concat(cardData));
    }, 3000);
  };

  function monthDiff(dateFrom: Date, dateTo: Date): number {
    if (!dateFrom || !dateTo) return 0;
    return (
      dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear())
    );
  }

  const filteredCards = titleFilter
    ? cardData.filter((c) => c.title.includes(titleFilter))
    : cardData;

  return (
    <PageContainer>
      <HeroContainer>
        <IntroContainer>
          <HypeIconBig />
          <TitleText>What is hype farming?</TitleText>
          <DescriptionContainer>
            APE is launching it’s testnet, and we’d like everyone to come & check it out! All
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
          label="Search for hype pools..."
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        <TitleText>Active Hype Pools</TitleText>
      </PoolContainer>
      {filteredCards.length > 0 ? (
        <InfiniteScroll
          className="cardContainer"
          dataLength={cardData.length}
          next={addMoreCards}
          hasMore={true}
          loader={
            <footer>
              <LoadingSpinner />
            </footer>
          }
          scrollableTarget="scrollableDiv"
        >
          {filteredCards.map((data, i) => (
            <Card key={`${data.title}-${i}`}>
              <div className="container">
                <h3>{data.title}</h3>
                <span>{data.description}</span>
                <div className="dataContainer">
                  <span className="dataHeader">Pool:</span>
                  <span className="dataValue">
                    {data.pool} {data.poolToken}
                  </span>
                </div>
                <div className="dataContainer">
                  <span className="dataHeader">Bonus:</span>
                  <span className="dataValue">
                    {data.bonus} {data.bonusToken}
                  </span>
                </div>
                <div className="dataContainer">
                  <span className="dataHeader">Min reward:</span>
                  <span className="dataValue">
                    {data.minReward} {data.rewardToken}
                  </span>
                </div>
                <div className="dataContainer">
                  <span className="dataHeader">Duration:</span>
                  <span className="dataValue">
                    {monthDiff(data.startDate, data.endDate)} months left
                  </span>
                </div>
                <Button size="full-width">Learn more</Button>
              </div>
            </Card>
          ))}
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

export default Home;
