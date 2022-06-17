import React from 'react';
import { useProfileEffects } from './Profile.effects';
import {
  ProfileContainer,
  RewardsContainer,
  CardContainer,
} from './Profile.styled';
import Box from '../../components/styles/Box';

export const Profile = () => {
  const { joinedPools, createdPools, currentReward } = useProfileEffects();

  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundColor='background'
      justifyContent="center"
    >
      <Box
        display="flex"
        flexDirection={{
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'row',
            xl: 'row',
          }}
          backgroundColor='background'
        justifyContent="center"
      >
        <ProfileContainer telegramUsername="hyper123" address="0x00000000000000000000000000000" />
        <RewardsContainer rewardAmount={currentReward} onRedeem={() => console.log('redeemed')} />
      </Box>
      <CardContainer
        show={3}
        title={`Created Pools (${createdPools.length})`}
        cards={createdPools}
        emptyMessage="Looks like you haven’t created any pools yet..."
        target="/createdPools"
      />
      <CardContainer
        show={3}
        title={`Joined Pools (${joinedPools.length})`}
        cards={joinedPools}
        emptyMessage="Looks like you haven’t joined any pools yet..."
        target="/joinedPools"
      />
    </Box>
  );
};
