import { useState, useEffect } from 'react';
import { useGetHypeUserBy } from 'src/api/user/useGetUserBy';
import { useUpdateTelegram } from 'src/api/user/useUpdateTelegram';
import useWallet from 'src/hooks/useWallet';
import { TelegramUser } from 'src/models/HypeUser.model';
import { useGetHypePoolsBy } from '../../api/pools/useGetHypePoolsBy';
import { HypePool } from '../../models';

interface TelegramProfile {
  address: string;
  username: string;
}

export const useProfileEffects = () => {
  const { account } = useWallet();
  const [joinedPools, setJoinedPools] = useState<HypePool[]>([]);
  const [createdPools, setCreatedPools] = useState<HypePool[]>([]);
  const [currentReward, setCurrentReward] = useState<number>(0);
  const [telegramProfile, setTelegramProfile] = useState<TelegramProfile>({} as TelegramProfile);
  const { data } = useGetHypePoolsBy(account);
  const { data: hypeUser } = useGetHypeUserBy(account);
  const submitHandler = useUpdateTelegram();

  useEffect(() => {
    if (data?.length) {
      setCreatedPools(data);
    }
  }, [data]);

  const onRedeem = () => {
    console.log('Bazinga! You clicked the button!');
  };

  const useConnect = async (user: TelegramUser) => {
    console.log('new T user is', user);
    setTelegramProfile({
      address: account,
      username: user.username,
    });
    if (account && user && user.username && user.auth_date) {
      submitHandler({ address: account, username: user.username, auth_date: user.auth_date });
    }
  };

  const useDisconnect = async (user: TelegramUser) => {
    console.log('disconnected T user is', user);
    setTelegramProfile({
      address: account,
      username: undefined,
    });
    submitHandler({ address: account, username: null, auth_date: null });
  };

  useEffect(() => {
    setTelegramProfile({
      address: account,
      username: hypeUser?.username,
    });
  }, [account, hypeUser]);

  useEffect(() => {
    setJoinedPools([
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
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 5)),
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
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
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
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 7)),
      },
    ]);
    setCurrentReward(10000);
  }, []);

  return {
    joinedPools,
    createdPools,
    currentReward,
    onRedeem,
    telegramProfile,
    useConnect,
    useDisconnect,
  };
};
