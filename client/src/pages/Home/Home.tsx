import React, { useEffect, useState } from "react";
import { HypeIconBig } from "../../assets/icons/HypeIcon";
import SearchIcon from "../../assets/icons/Search";
import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
import Input from "../../components/input/Input";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Home.css";
import LoadingSpinner from "../../assets/icons/Spinner";

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

  useEffect(() => {
    setCardData([
      {
        title: "ApeCoin Staking Launch!",
        description:
          "APE is launching it’s testnet, and we’d like everyone to come & check it out! All participants will be able to claim rewards as loooooooong All participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongvvvAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongv",
        pool: 100000,
        poolToken: "APE",
        bonus: 12000,
        bonusToken: "TARA",
        minReward: 1,
        rewardToken: "APE",
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        title: "ApeCoin Staking Launch!",
        description:
          "APE is launching it’s testnet, and we’d like everyone to come & check it out! All participants will be able to claim rewards as loooooooong All participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongvvvAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongv",
        pool: 100000,
        poolToken: "APE",
        bonus: 12000,
        bonusToken: "TARA",
        minReward: 1,
        rewardToken: "APE",
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        title: "ApeCoin Staking Launch!",
        description:
          "APE is launching it’s testnet, and we’d like everyone to come & check it out! All participants will be able to claim rewards as loooooooong All participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongvvvAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongv",
        pool: 100000,
        poolToken: "APE",
        bonus: 12000,
        bonusToken: "TARA",
        minReward: 1,
        rewardToken: "APE",
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        title: "ApeCoin Staking Launch!",
        description:
          "APE is launching it’s testnet, and we’d like everyone to come & check it out! All participants will be able to claim rewards as loooooooong All participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongvvvAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongv",
        pool: 100000,
        poolToken: "APE",
        bonus: 12000,
        bonusToken: "TARA",
        minReward: 1,
        rewardToken: "APE",
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        title: "ApeCoin Staking Launch!",
        description:
          "APE is launching it’s testnet, and we’d like everyone to come & check it out! All participants will be able to claim rewards as loooooooong All participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongvvvAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongv",
        pool: 100000,
        poolToken: "APE",
        bonus: 12000,
        bonusToken: "TARA",
        minReward: 1,
        rewardToken: "APE",
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
      dateTo.getMonth() -
      dateFrom.getMonth() +
      12 * (dateTo.getFullYear() - dateFrom.getFullYear())
    );
  }

  return (
    <div className="pageContainer">
      <div className="heroContainer">
        <div className="intro">
          <HypeIconBig />
          <h3 className="header">What is hype farming?</h3>
          <span className="description">
            APE is launching it’s testnet, and we’d like everyone to come &
            check it out! All participants will be able to claim rewards...
          </span>
        </div>
        <div className="videoContainer">
          <iframe
            src="https://www.youtube.com/embed/E7wJTI-1dvQ"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />{" "}
        </div>
      </div>
      <div className="poolContainer">
        <h3 className="header">Active Hype Pools</h3>
        <Input Icon={<SearchIcon />} label="Search for hype pools..." />
      </div>
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
        {cardData.map((data, i) => (
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
    </div>
  );
};

export default Home;
