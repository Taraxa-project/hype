import React from 'react';
import { useProfileEffects } from './Profile.effects';
import { ProfileContainer, RewardsContainer, CardContainer } from './Profile.containers';
import Box from '../../components/styles/Box';

export const Profile = () => {
  const { joinedPools, createdPools, currentReward, onRedeem, telegramProfile } =
    useProfileEffects();
  const { username, address } = telegramProfile;
  return (
    <Box display="flex" flexDirection="column" backgroundColor="background" justifyContent="center">
      <Box
        display="flex"
        flexDirection={{
          xs: 'column',
          sm: 'column',
          md: 'row',
          lg: 'row',
          xl: 'row',
        }}
        backgroundColor="background"
        justifyContent="space-between"
      >
        <ProfileContainer telegramUsername={username} address={address} />
        <RewardsContainer rewardAmount={currentReward} onRedeem={onRedeem} />
      </Box>
      <CardContainer
        show={3}
        title={`Created Pools (${createdPools?.length})`}
        cards={createdPools}
        emptyMessage="Looks like you haven’t created any pools yet..."
        target="/createdPools"
      />
      <CardContainer
        show={3}
        title={`Joined Pools (${joinedPools?.length})`}
        cards={joinedPools}
        emptyMessage="Looks like you haven’t joined any pools yet..."
        target="/joinedPools"
      />
    </Box>
  );
};
