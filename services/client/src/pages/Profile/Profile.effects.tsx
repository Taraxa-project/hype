import { useState, useEffect } from 'react';
import { useGetHypeUserBy } from 'src/api/user/useGetUserBy';
import { useUpdateTelegram } from 'src/api/user/useUpdateTelegram';
import useWallet from 'src/hooks/useWallet';
import { TelegramUser } from 'src/models/HypeUser.model';
import { useGetHypePoolsBy } from '../../api/pools/useGetHypePoolsBy';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
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
  const dispatchModals = useModalsDispatch();

  useEffect(() => {
    if (data?.length) {
      setCreatedPools(data);
    }
  }, [data]);

  const onRedeem = () => {
    console.log('Bazinga! You clicked the button!');
  };

  const connect = async (user: TelegramUser) => {
    console.log('new T user is', user);
    const usernameTemp = user.username || `${user.first_name} ${user.last_name}`;
    setTelegramProfile({
      address: account,
      username: usernameTemp,
    });
    try {
      if (account && user && user.auth_date && usernameTemp) {
        submitHandler({ address: account, username: usernameTemp, auth_date: user.auth_date });
      }
    } catch (err: any) {
      setTelegramProfile({
        address: account,
        username: undefined,
      });
      dispatchModals({
        type: ModalsActionsEnum.SHOW_TELEGRAM_INFO,
        payload: {
          open: true,
          title: 'Connect telegram',
          text: 'Error',
          message: err?.error || err?.message,
        },
      });
    }
  };

  const disconnect = async (user: TelegramUser) => {
    const usernameTemp = user.username || `${user.first_name} ${user.last_name}`;
    dispatchModals({
      type: ModalsActionsEnum.SHOW_DISCONNECT_TELEGRAM,
      payload: {
        open: true,
        title: 'Disconnect account',
        text: 'Are you sure you want to disconnect this account?',
        username: usernameTemp,
        onDisconnect,
      },
    });
    console.log('disconnected T user is', user);
  };

  const onDisconnect = () => {
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
        token: '0xc770EEfAd204B5180dF6a14Ee197D99d808ee52d',
        creator: '0x000000000000000000000000000000000000001',
        cap: 100000,
        active: true,
        minReward: 1,
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 5)),
      },
      {
        projectName: 'ApeCoin Hype',
        title: 'ApeCoin Staking Launch!',
        description:
          'Culture has found new expression in web3 through art, gaming, entertainment, and events. The possibilities for blockchain`s impact on culture are so endless that they can`t possibly all be predicted yet. APE is a token made to support what`s next, controlled and built on by the community. It will serve as a decentralized protocol layer for community-led initiatives that drive culture forward into the metaverse.',
        cap: 100000,
        token: '0x4d224452801ACEd8B2F0aebE155379bb5D594381',
        creator: '0x000000000000000000000000000000000000002',
        active: true,
        minReward: 1,
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      },
      {
        projectName: 'SHIBA INU Hype',
        title: 'SHIBA INU Staking Launch!',
        description:
          'Shiba Inu (SHIB) is a token that aspires to be an Ethereum-based alternative to Dogecoin (DOGE), the popular memecoin. Unlike Bitcoin, which is designed to be scarce, SHIB is intentionally abundant — with a total supply of one quadrillion. The Shiba Inu Token ecosystem supports projects such as an NFT art incubator and the development of a decentralized exchange called Shibaswap.',
        cap: 100000,
        token: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
        creator: '0x000000000000000000000000000000000000003',
        active: true,
        minReward: 1,
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
    connect,
    disconnect,
  };
};
