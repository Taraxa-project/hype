import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetHypeUser } from '../../api/user/useGetUser';
import { useUpdateTelegram } from '../../api/user/useUpdateTelegram';
import useWallet from '../../hooks/useWallet';
import { useQuery } from 'urql';
import { HYPEPOOL_QUERIES } from '../../api/pools/query-collector';
import { useGetJoinedPools } from '../../api/pools/useGetJoinedPools';
import { useGetMyRewards } from '../../api/rewards/useGetUserRewards';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { HypePool, TelegramUser } from '../../models';

interface TelegramProfile {
  telegramId: string;
  address: string;
  username: string;
}

export const useProfileEffects = () => {
  const { account } = useWallet();
  const [joinedPools, setJoinedPools] = useState<HypePool[]>([]);
  const [createdPools, setCreatedPools] = useState<HypePool[]>([]);
  const { data } = useGetMyRewards();
  const { data: fetchedJoinedPolls } = useGetJoinedPools();
  const [telegramProfile, setTelegramProfile] = useState<TelegramProfile>({} as TelegramProfile);
  const [{ data: hypePoolsData }] = useQuery({
    query: HYPEPOOL_QUERIES.profilePoolsQuery,
    variables: { creator: account },
    pause: !account,
  });
  const { data: hypeUser } = useGetHypeUser();
  const submitHandler = useUpdateTelegram();
  const dispatchModals = useModalsDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (hypePoolsData) {
      setCreatedPools(hypePoolsData.hypePools);
    }
  }, [hypePoolsData]);

  const onRedeem = () => {
    navigate(`/redeem`);
  };

  const currentRewardsNo = data.totalUnclaimed.length;

  useEffect(() => {
    if (fetchedJoinedPolls) {
      setJoinedPools(fetchedJoinedPolls);
    }
  }, [fetchedJoinedPolls]);

  const connect = async (user: TelegramUser) => {
    const usernameTemp = user.username || `${user.first_name} ${user.last_name}`;
    setTelegramProfile({
      telegramId: user.id?.toString(),
      address: account,
      username: usernameTemp,
    });
    try {
      if (account && user && user.auth_date && usernameTemp) {
        submitHandler({
          address: account,
          username: usernameTemp,
          auth_date: user.auth_date,
          telegramId: user.id?.toString(),
        });
      }
    } catch (err: any) {
      setTelegramProfile({
        telegramId: undefined,
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

  const disconnect = async () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_DISCONNECT_TELEGRAM,
      payload: {
        open: true,
        title: 'Disconnect account',
        text: 'Are you sure you want to disconnect this account?',
        username: telegramProfile.username,
        onDisconnect,
      },
    });
    // console.log('disconnected T user is', user);
  };

  const onDisconnect = () => {
    setTelegramProfile({
      telegramId: undefined,
      address: account,
      username: undefined,
    });
    submitHandler({ address: account, username: null, auth_date: null, telegramId: null });
  };

  useEffect(() => {
    if (hypeUser) {
      setTelegramProfile({
        telegramId: hypeUser.telegramId,
        address: account,
        username: hypeUser.username,
      });
    }
  }, [account, hypeUser]);

  const onPoolDetails = (cardData: HypePool) => {
    navigate(`/pool/${cardData.id}`);
  };

  return {
    joinedPools,
    createdPools,
    currentRewardsNo,
    onRedeem,
    telegramProfile,
    connect,
    disconnect,
    onPoolDetails,
  };
};
