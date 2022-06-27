import React from 'react';
import { useProfileEffects } from './Profile.effects';
import Box from '../../components/styles/Box';
import { ProfileContainer, RewardsContainer, CardContainer } from '../../containers/profile';

export const Profile = () => {
  const {
    joinedPools,
    createdPools,
    currentReward,
    onRedeem,
    telegramProfile,
    connect,
    disconnect,
  } = useProfileEffects();
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
        <ProfileContainer
          telegramUsername={username}
          address={address}
          connect={connect}
          disconnect={disconnect}
        />
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
        title={`My rewards by pool (${joinedPools?.length})`}
        cards={joinedPools}
        emptyMessage="Looks like you haven’t joined any pools yet..."
        target="/joinedPools"
      />
    </Box>
  );
};
