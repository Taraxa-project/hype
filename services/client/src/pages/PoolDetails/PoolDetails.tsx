import { useParams } from 'react-router-dom';
import Blockies from 'react-blockies';
import { usePoolDetailsEffects } from './PoolDetails.effects';
import { transformFromWei, formatDate, networks } from '../../utils';
import DotIcon from '../../assets/icons/Dot';
import {
  PoolContainer,
  Subheader,
  BlockiesContainer,
  InfoContainer,
  InfoHeader,
  InfoValue,
  Account,
  Description,
} from './PoolDetails.styled';
import Button from '../../components/button/Button';
import Box from '../../components/styles/Box';
import Text from '../../components/styles/Text';
import { SharePool } from '../../components/share-pool/SharePool';

export const PoolDetails = () => {
  const { poolId } = useParams();
  const {
    title,
    description,
    projectDescription,
    tokenName,
    word,
    network,
    tokenAddress,
    creator,
    projectName,
    cap,
    impressionReward,
    active,
    endDate,
    startDate,
    tokenDecimals,
    isDeposited,
    authenticated,
    fund,
    activate,
    account,
    onParticipate,
  } = usePoolDetailsEffects(poolId);
  const startedAt =
    Number(startDate) !== 0 ? formatDate(new Date(+startDate * 1000)) : '(not yet active)';
  const endsAt = Number(endDate) !== 0 ? formatDate(new Date(+endDate * 1000)) : '(not yet active)';

  return (
    <PoolContainer>
      <SharePool title={title} createdPoolIndex={poolId} poolName={title} />
      <Subheader>Pool creator:</Subheader>
      {creator && (
        <BlockiesContainer>
          <Blockies seed={creator} />
          <Account>{creator}</Account>
        </BlockiesContainer>
      )}
      <Subheader>Campaign Description:</Subheader>
      <Description>{description}</Description>
      <Subheader>Project description:</Subheader>
      <Description>{projectDescription}</Description>
      {projectName && (
        <InfoContainer>
          <InfoHeader>Project name:</InfoHeader>
          <InfoValue>{projectName}</InfoValue>
        </InfoContainer>
      )}
      {word && (
        <InfoContainer>
          <InfoHeader>Campaign keyword:</InfoHeader>
          <InfoValue>{word}</InfoValue>
        </InfoContainer>
      )}
      {network && (
        <InfoContainer>
          <InfoHeader>Network:</InfoHeader>
          <InfoValue>{networks[network].chainName}</InfoValue>
        </InfoContainer>
      )}
      {tokenName && (
        <InfoContainer>
          <InfoHeader>Token name:</InfoHeader>
          <InfoValue>{tokenName}</InfoValue>
        </InfoContainer>
      )}
      {tokenAddress && tokenAddress !== '0x0000000000000000000000000000000000000000' && (
        <>
          <InfoHeader>Token contract address:</InfoHeader>
          <BlockiesContainer>
            <Blockies seed={tokenAddress} />
            <Account>{tokenAddress}</Account>
          </BlockiesContainer>
        </>
      )}
      {cap && (
        <InfoContainer>
          <InfoHeader key={`pool-${Date.now()}`}>Total rewards for the pool:</InfoHeader>
          <InfoValue key={`${cap}-${Date.now()}`}>
            {transformFromWei(cap, tokenDecimals)} {tokenName}
          </InfoValue>
        </InfoContainer>
      )}
      {impressionReward && (
        <InfoContainer>
          <InfoHeader>Reward / impressions:</InfoHeader>
          <InfoValue>
            {transformFromWei(impressionReward, tokenDecimals)} {tokenName}
          </InfoValue>
        </InfoContainer>
      )}

      <InfoContainer>
        <InfoHeader key={`startDate-${Date.now()}`}>Start Date:</InfoHeader>
        <InfoValue key={`${startDate}-${Date.now()}`}>{startedAt}</InfoValue>
      </InfoContainer>

      <InfoContainer>
        <InfoHeader key={`endDate-${Date.now()}`}>End Date:</InfoHeader>
        <InfoValue key={`${endDate}-${Date.now()}`}>{endsAt}</InfoValue>
      </InfoContainer>

      {/* {endDate && (
        <InfoContainer>
          <InfoHeader key={`endDate-${Date.now()}`}>Duration:</InfoHeader>
          <InfoValue key={`${endDate}-${Date.now()}`}>{getPoolDuration(+endDate)}</InfoValue>
        </InfoContainer>
      )} */}

      <InfoContainer>
        <InfoHeader>Status:</InfoHeader>
        {active ? (
          <InfoValue key={`active-${Date.now()}`}>
            <DotIcon color="#15AC5B" /> Active
          </InfoValue>
        ) : (
          <InfoValue key={`active-${Date.now()}`}>
            <DotIcon color="#C2C2C2" /> (not yet active)
          </InfoValue>
        )}
      </InfoContainer>
      {!active && authenticated && account?.toLowerCase() === creator?.toLowerCase() && (
        <Box my={4}>
          {!isDeposited ? (
            <Button disabled={!authenticated} size="full-width" type="button" onClick={fund}>
              Fund the Pool
            </Button>
          ) : (
            <Box>
              <Text pt={4} fontSize="1.25rem" fontWeight="700" color="greys.7">
                You need to activate the pool for participating community members to be rewarded.
              </Text>
              <Text py={4} fontSize="1.25rem" fontWeight="700" color="greys.7">
                You may activate the pool at any time, but once you activate the pool it cannot be
                deactivated.
              </Text>
              <Button
                disabled={!authenticated}
                size="full-width"
                type="submit"
                variant="success"
                onClick={activate}
              >
                Activate the Pool
              </Button>
            </Box>
          )}
        </Box>
      )}
      <Box my={4}>
        <Button size="full-width" onClick={onParticipate}>
          📣 Participate Now!
        </Button>
      </Box>
    </PoolContainer>
  );
};
