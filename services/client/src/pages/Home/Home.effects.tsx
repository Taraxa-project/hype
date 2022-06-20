import { useEffect, useState } from 'react';
import Card from 'src/components/card/Card';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { HypePool } from '../../models';

export const useHomeEffects = () => {
  const [cardData, setCardData] = useState<HypePool[]>([]);
  const [titleFilter, setTitleFilter] = useState('');
  const dispatchModals = useModalsDispatch();

  useEffect(() => {
    setCardData([
      {
        projectName: 'FoxCoin Hype',
        title: 'FoxCoin Staking Launch!',
        description:
          'FOX is an Ethereum token that governs ShapeShift, a decentralized exchange. By participating in the ShapeShift DAO (decentralized autonomous organization), FOX holders can vote on future asset integrations, products, and fee structures for the platform.',
        rewardsAddress: '0xc770EEfAd204B5180dF6a14Ee197D99d808ee52d',
        creatorAddress: '0x000000000000000000000000000000000000001',
        pool: 100000,
        minReward: 1,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth()+5)),
      },
      {
        projectName: 'ApeCoin Hype',
        title: 'ApeCoin Staking Launch!',
        description:
          'Culture has found new expression in web3 through art, gaming, entertainment, and events. The possibilities for blockchain`s impact on culture are so endless that they can`t possibly all be predicted yet. APE is a token made to support what`s next, controlled and built on by the community. It will serve as a decentralized protocol layer for community-led initiatives that drive culture forward into the metaverse.',
        pool: 100000,
        rewardsAddress: '0x4d224452801ACEd8B2F0aebE155379bb5D594381',
        creatorAddress: '0x000000000000000000000000000000000000002',
        minReward: 1,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth()+3)),
      },
      {
        projectName: 'SHIBA INU Hype',
        title: 'SHIBA INU Staking Launch!',
        description:
          'Shiba Inu (SHIB) is a token that aspires to be an Ethereum-based alternative to Dogecoin (DOGE), the popular memecoin. Unlike Bitcoin, which is designed to be scarce, SHIB is intentionally abundant — with a total supply of one quadrillion. The Shiba Inu Token ecosystem supports projects such as an NFT art incubator and the development of a decentralized exchange called Shibaswap.',
        pool: 100000,
        rewardsAddress: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
        creatorAddress: '0x000000000000000000000000000000000000003',
        minReward: 1,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth()+7)),
      },
    ]);
  }, []);

  const addMoreCards = () => {
    setTimeout(() => {
      const currCards = cardData;
      setCardData(currCards.concat(cardData));
    }, 3000);
  };

  const filteredCards = (
    titleFilter ? cardData.filter((c) => c.title?.includes(titleFilter)) : cardData
  ).map((data, i) => (
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
      onClick={() => {
        dispatchModals({
          type: ModalsActionsEnum.SHOW_CARD_DETAILS,
          payload: {
            open: true,
            cardData: cardData[i],
          },
        });
      }}
    />
  ));

  return {
    setTitleFilter,
    addMoreCards,
    filteredCards,
    cardData,
  };
};
