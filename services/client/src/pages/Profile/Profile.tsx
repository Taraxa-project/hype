import React from 'react';
import { useProfileEffects } from './Profile.effects';
import {
  ProfileContainer,
  RewardsContainer,
  StyledContainerColumn,
  StyledContainerRow,
  CardContainer,
} from './Profile.styled';

export const Profile = () => {
  const { joinedPools, createdPools, currentReward } = useProfileEffects();

  return (
    <StyledContainerColumn>
      <StyledContainerRow>
        <ProfileContainer telegramUsername="hyper123" address="0x00000000000000000000000000000" />
        <RewardsContainer rewardAmount={currentReward} onRedeem={() => console.log('redeemed')} />
      </StyledContainerRow>
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
    </StyledContainerColumn>
  );
};
