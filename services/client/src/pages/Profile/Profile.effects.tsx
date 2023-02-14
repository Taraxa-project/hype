import { useState, useEffect } from 'react';
import { useGetHypeUserBy } from 'src/api/user/useGetUserBy';
import { useUpdateTelegram } from 'src/api/user/useUpdateTelegram';
import useWallet from 'src/hooks/useWallet';
import { TelegramUser } from 'src/models/HypeUser.model';
import { useQuery } from 'urql';
import { HYPEPOOL_QUERIES } from '../../api/pools/query-collector';
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
  const [currentReward, setCurrentReward] = useState<number>(null);
  const [telegramProfile, setTelegramProfile] = useState<TelegramProfile>({} as TelegramProfile);
  const [{ data: hypePoolsData }] = useQuery({
    query: HYPEPOOL_QUERIES.profilePoolsQuery,
    variables: { creator: account },
    pause: !account,
  });
  const { data: hypeUser } = useGetHypeUserBy(account);
  const submitHandler = useUpdateTelegram();
  const dispatchModals = useModalsDispatch();

  useEffect(() => {
    if (hypePoolsData?.hypePools?.length > 0) {
      setCreatedPools(hypePoolsData?.hypePools);
    }
  }, [hypePoolsData]);

  const onRedeem = () => {
    // console.log('Bazinga! You clicked the button!');
  };

  const connect = async (user: TelegramUser) => {
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
    // console.log('disconnected T user is', user);
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
