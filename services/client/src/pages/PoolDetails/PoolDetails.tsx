import { useParams } from 'react-router-dom';
import { usePoolDetailsEffects } from './PoolDetails.effects';
import {
  transformFromWei,
  formatDate,
  networks,
  fullIpfsUrl,
  prettifyNumber,
  splitPrettifyNumber,
} from '../../utils';
import DotIcon from '../../assets/icons/Dot';
import {
  PoolContainer,
  Subheader,
  InfoContainer,
  InfoHeader,
  InfoValue,
  Description,
  PoolImage,
  PoolDetailsWrapper,
  Keyword,
  KeywordWrapper,
  List,
  ListItem,
  CategoryTitle,
  Stats,
  PoolTitle,
} from './PoolDetails.styled';
import Button from '../../components/button/Button';
import Box from '../../components/styles/Box';
import Text from '../../components/styles/Text';
import { SharePool } from '../../components/share-pool/SharePool';
import { RoundContainer } from '../../components/container/RoundContainer.styled';
import { StatsCard } from '../../components/stats-card/StatsCard';
import { Leaderboard } from '../../components/leaderboard/Leaderboard';

export const PoolDetails = () => {
  const { poolId } = useParams();
  const {
    title,
    description,
    projectDescription,
    tokenName,
    tokenSymbol,
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
    duration,
    isDeposited,
    authenticated,
    imageUri,
    fund,
    activate,
    account,
    onParticipate,
    poolStats,
    leaderboard,
  } = usePoolDetailsEffects(poolId);
  const startedAt =
    Number(startDate) !== 0 && !!startDate ? formatDate(new Date(+startDate * 1000)) : null;
  const endsAt = Number(endDate) !== 0 && !!endDate ? formatDate(new Date(+endDate * 1000)) : null;
  const tokensAwarded = poolStats?.tokensAwarded
    ? Number(transformFromWei(poolStats.tokensAwarded, tokenDecimals))
    : null;
  const tokensClaimed = poolStats?.tokensClaimed
    ? Number(transformFromWei(poolStats.tokensClaimed, tokenDecimals))
    : null;

  return (
    <PoolContainer>
      <RoundContainer>
        <Box>
          <PoolTitle>{title}</PoolTitle>
          <List>
            <ListItem>
              {prettifyNumber(Number(transformFromWei(cap, tokenDecimals)))} {tokenSymbol}
            </ListItem>
            <ListItem>
              {transformFromWei(impressionReward, tokenDecimals)} {tokenSymbol} / Impression
            </ListItem>
            <ListItem>{active ? 'Active' : 'Inactive'}</ListItem>
            {endsAt && <ListItem>ends {endsAt}</ListItem>}
          </List>
          <KeywordWrapper>
            <Text fontWeight="500" fontSize="1.25rem">
              Required keywords:
            </Text>
            {word && <Keyword>{word}</Keyword>}
            {tokenName && <Keyword>{tokenName}</Keyword>}
          </KeywordWrapper>
          <SharePool createdPoolIndex={poolId} poolName={title} />
          {imageUri && <PoolImage src={`${fullIpfsUrl(imageUri)}`} />}
          {poolStats &&
            poolStats.tokensAwarded &&
            poolStats.tokensClaimed &&
            poolStats.impressions && (
              <Box>
                <CategoryTitle>
                  🚩
                  <Text fontWeight="700" fontSize="1.25rem" lineHeight="26px">
                    Hype Pool Progress
                  </Text>
                </CategoryTitle>
                <Stats>
                  <StatsCard
                    title={splitPrettifyNumber(tokensAwarded)[0]}
                    titleCategory={splitPrettifyNumber(tokensAwarded)[1]}
                    subtitle={`${tokenSymbol} awarded`}
                  />
                  <StatsCard
                    title={splitPrettifyNumber(tokensClaimed)[0]}
                    titleCategory={splitPrettifyNumber(tokensClaimed)[1]}
                    subtitle={`${tokenSymbol} claimed`}
                  />
                  <StatsCard title={poolStats.participants} subtitle="Hypers participated" />
                  <StatsCard
                    title={Number(poolStats.impressions).toFixed(1)}
                    subtitle="Impressions generated"
                  />
                </Stats>
              </Box>
            )}
          {leaderboard?.length > 0 && (
            <Box pt={4}>
              <CategoryTitle>
                👑
                <Text fontWeight="700" fontSize="1.25rem" lineHeight="26px">
                  Weekly Leaderboard
                </Text>
              </CategoryTitle>
              <Leaderboard topAccounts={leaderboard} />
            </Box>
          )}
        </Box>
      </RoundContainer>

      <RoundContainer>
        <Box>
          <Subheader>Campaign Description</Subheader>
          <Description>{description}</Description>
        </Box>
        <Box>
          <Subheader>Project description:</Subheader>
          <Description>{projectDescription}</Description>
        </Box>
        <PoolDetailsWrapper>
          <Subheader>Pool details</Subheader>

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
            <InfoContainer>
              <InfoHeader>Token contract address:</InfoHeader>
              <InfoValue>{tokenAddress}</InfoValue>
            </InfoContainer>
          )}
          {cap && (
            <InfoContainer>
              <InfoHeader>Total rewards for the pool:</InfoHeader>
              <InfoValue>
                {transformFromWei(cap, tokenDecimals)} {tokenSymbol}
              </InfoValue>
            </InfoContainer>
          )}
          {impressionReward && (
            <InfoContainer>
              <InfoHeader>Reward / impression:</InfoHeader>
              <InfoValue>
                {transformFromWei(impressionReward, tokenDecimals)} {tokenSymbol}
              </InfoValue>
            </InfoContainer>
          )}

          {startedAt && (
            <InfoContainer>
              <InfoHeader>Start Date:</InfoHeader>
              <InfoValue>{startedAt}</InfoValue>
            </InfoContainer>
          )}

          {endsAt && (
            <InfoContainer>
              <InfoHeader>End Date:</InfoHeader>
              <InfoValue>{endsAt}</InfoValue>
            </InfoContainer>
          )}

          {duration && (
            <InfoContainer>
              <InfoHeader>Duration:</InfoHeader>
              <InfoValue>{duration / (24 * 60 * 60)} days</InfoValue>
            </InfoContainer>
          )}

          <InfoContainer>
            <InfoHeader>Status:</InfoHeader>
            {active ? (
              <InfoValue>
                <DotIcon color="#15AC5B" /> Active
              </InfoValue>
            ) : (
              <InfoValue>
                <DotIcon color="#C2C2C2" /> (not yet active)
              </InfoValue>
            )}
          </InfoContainer>
          {creator && (
            <InfoContainer>
              <InfoHeader>Pool creator:</InfoHeader>
              <InfoValue>{creator}</InfoValue>
            </InfoContainer>
          )}
        </PoolDetailsWrapper>
      </RoundContainer>

      {!active && authenticated && account?.toLowerCase() === creator?.toLowerCase() && (
        <RoundContainer>
          <Box>
            <Box mb={4}>
              {!isDeposited ? (
                <Button disabled={!authenticated} size="full-width" type="button" onClick={fund}>
                  Fund the Pool
                </Button>
              ) : (
                <Box>
                  <Text pt={4} fontSize="1.25rem" fontWeight="700" color="greys.7">
                    You need to activate the pool for participating community members to be
                    rewarded.
                  </Text>
                  <Text py={4} fontSize="1.25rem" fontWeight="700" color="greys.7">
                    You may activate the pool at any time, but once you activate the pool it cannot
                    be deactivated.
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
          </Box>
        </RoundContainer>
      )}

      <Box>
        <Button size="full-width" onClick={onParticipate}>
          📣 Participate Now!
        </Button>
      </Box>
    </PoolContainer>
  );
};
