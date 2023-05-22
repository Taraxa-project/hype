import Box from '../../components/styles/Box';
import { ProfileContainer, RewardsContainer, CardContainer } from '../../containers/profile';
import { useProfileEffects } from './Profile.effects';

export const Profile = () => {
  const {
    joinedPools,
    createdPools,
    currentRewardsNo,
    onRedeem,
    telegramProfile,
    connect,
    disconnect,
    onPoolDetails,
  } = useProfileEffects();
  const { username, address } = telegramProfile;
  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundColor="background"
      justifyContent="center"
      gridGap="1rem"
    >
      <Box
        display="flex"
        flexDirection={{ _: 'column', md: 'row', xl: 'row' }}
        backgroundColor="background"
        justifyContent="space-between"
        gridGap="1rem"
      >
        <ProfileContainer
          telegramUsername={username}
          address={address}
          connect={connect}
          disconnect={disconnect}
        />
        <RewardsContainer rewardAmount={currentRewardsNo} onRedeem={onRedeem} />
      </Box>
      <CardContainer
        title={`Created Pools (${createdPools.length})`}
        cards={createdPools}
        emptyMessage="Looks like you haven’t created any pools yet..."
        target="/createdPools"
        action={onPoolDetails}
      />
      <CardContainer
        title={`Joined Pools (${joinedPools.length})`}
        cards={joinedPools}
        emptyMessage="Looks like you haven’t joined any pools yet..."
        target="/joinedPools"
        action={onPoolDetails}
      />
    </Box>
  );
};
