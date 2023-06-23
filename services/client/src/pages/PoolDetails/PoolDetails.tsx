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
} from './PoolDetails.styled';
import Button from '../../components/button/Button';
import Box from '../../components/styles/Box';
import Text from '../../components/styles/Text';
import { SharePool } from '../../components/share-pool/SharePool';
import { RoundContainer } from '../../components/container/RoundContainer.styled';
import FlagIcon from '../../assets/icons/Flag';
import CrownIcon from '../../assets/icons/Crown';
import { StatsCard } from '../../components/stats-card/StatsCard';
import { Leaderboard } from '../../components/leaderboard/Leaderboard';

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
    imageUri,
    fund,
    activate,
    account,
    onParticipate,
    poolStats,
    leaderboard,
  } = usePoolDetailsEffects(poolId);
  const startedAt =
    Number(startDate) !== 0 ? formatDate(new Date(+startDate * 1000)) : '(not yet active)';
  const endsAt = Number(endDate) !== 0 ? formatDate(new Date(+endDate * 1000)) : '(not yet active)';
  const poolTokenName = tokenName || 'TARA';
  const tokensAwarded = poolStats?.tokensAwarded
    ? Number(transformFromWei(Number(poolStats.tokensAwarded), tokenDecimals))
    : null;
  const tokensClaimed = poolStats?.tokensClaimed
    ? Number(transformFromWei(Number(poolStats.tokensClaimed), tokenDecimals))
    : null;

  return (
    <PoolContainer>
      <RoundContainer>
        <Box>
          <Text fontWeight="700" fontSize="3rem" lineHeight="26px" pb={3}>
            {title}
          </Text>
          <List>
            <ListItem>
              {prettifyNumber(Number(transformFromWei(cap, tokenDecimals)))} {poolTokenName}
            </ListItem>
            <ListItem>
              {transformFromWei(impressionReward, tokenDecimals)} {poolTokenName} / Impression
            </ListItem>
            <ListItem>{active ? 'Active' : 'Inactive'}</ListItem>
            <ListItem>ends {endsAt}</ListItem>
          </List>
          <KeywordWrapper>
            <Text fontWeight="500" fontSize="1.25rem">
              Required keywords:
            </Text>
            <Keyword>{word}</Keyword>
            <Keyword>{poolTokenName}</Keyword>
          </KeywordWrapper>
          <SharePool createdPoolIndex={poolId} poolName={title} />
          {imageUri && <PoolImage src={`${fullIpfsUrl(imageUri)}`} />}
          {poolStats &&
            poolStats.tokensAwarded &&
            poolStats.tokensClaimed &&
            poolStats.impressions && (
              <Box>
                <CategoryTitle>
                  <FlagIcon />
                  <Text fontWeight="700" fontSize="1.25rem" lineHeight="26px">
                    Hype Pool Progress
                  </Text>
                </CategoryTitle>
                <Stats>
                  <StatsCard
                    title={splitPrettifyNumber(tokensAwarded)[0]}
                    titleCategory={splitPrettifyNumber(tokensAwarded)[1]}
                    subtitle="TARA awarded"
                  />
                  <StatsCard
                    title={splitPrettifyNumber(tokensClaimed)[0]}
                    titleCategory={splitPrettifyNumber(tokensClaimed)[1]}
                    subtitle="TARA claimed"
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
                <CrownIcon />
                <Text fontWeight="700" fontSize="1.25rem" lineHeight="26px">
                  Weekly Leaderbord
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
          <InfoContainer>
            <InfoHeader>Token name:</InfoHeader>
            <InfoValue>{poolTokenName}</InfoValue>
          </InfoContainer>
          {tokenAddress && tokenAddress !== '0x0000000000000000000000000000000000000000' && (
            <InfoContainer>
              <InfoHeader>Token contract address:</InfoHeader>
              <InfoValue>{tokenAddress}</InfoValue>
            </InfoContainer>
          )}
          {cap && (
            <InfoContainer>
              <InfoHeader key={`pool-${Date.now()}`}>Total rewards for the pool:</InfoHeader>
              <InfoValue key={`${cap}-${Date.now()}`}>
                {transformFromWei(cap, tokenDecimals)} {poolTokenName}
              </InfoValue>
            </InfoContainer>
          )}
          {impressionReward && (
            <InfoContainer>
              <InfoHeader>Reward / impression:</InfoHeader>
              <InfoValue>
                {transformFromWei(impressionReward, tokenDecimals)} {poolTokenName}
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
          {creator && (
            <InfoContainer>
              <InfoHeader>Pool creator:</InfoHeader>
              <InfoValue>{creator}</InfoValue>
            </InfoContainer>
          )}
        </PoolDetailsWrapper>
      </RoundContainer>

      <RoundContainer>
        <Box>
          {!active && authenticated && account?.toLowerCase() === creator?.toLowerCase() && (
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
          )}
          <Button size="full-width" onClick={onParticipate}>
            📣 Participate Now!
          </Button>
        </Box>
      </RoundContainer>
    </PoolContainer>
  );
};
