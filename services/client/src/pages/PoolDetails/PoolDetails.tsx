import { useParams } from 'react-router-dom';
import { usePoolDetailsEffects } from './PoolDetails.effects';
import {
  transformFromWei,
  formatDate,
  networks,
  fullIpfsUrl,
  prettifyNumber,
  splitPrettifyNumber,
  getPoolDuration,
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
  AddressValue,
} from './PoolDetails.styled';
import Button from '../../components/button/Button';
import Box from '../../components/styles/Box';
import Text from '../../components/styles/Text';
import { SharePool } from '../../components/share-pool/SharePool';
import { RoundContainer } from '../../components/container/RoundContainer.styled';
import { StatsCard } from '../../components/stats-card/StatsCard';
import { Leaderboard } from '../../components/leaderboard/Leaderboard';
import Tooltip from '../../components/tooltip/Tooltip';
import { PoolStatus } from '../../models';
import { getStatusColor, getStatusDisplayName } from '../../utils/pools';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';

export const PoolDetails = () => {
  const { poolId } = useParams();
  const dispatchModals = useModalsDispatch();

  const {
    pool,
    fetchingPoolData,
    tokenDecimals,
    tokenSymbol,
    isDeposited,
    authenticated,
    fund,
    activate,
    account,
    onParticipate,
    poolStats,
    leaderboard,
  } = usePoolDetailsEffects(poolId);

  if (fetchingPoolData) {
    return;
  }

  if (!pool) {
    return (
      <PoolContainer>
        <RoundContainer>
          <Box>
            <Text
              fontWeight="700"
              fontSize="2rem"
              lineHeight="26px"
              textAlign="center"
              paddingBottom="2rem"
            >
              There is no pool asociated with this ID:
            </Text>
            <Text fontWeight="700" fontSize="1.25rem" lineHeight="26px" textAlign="center">
              {poolId}
            </Text>
          </Box>
        </RoundContainer>
      </PoolContainer>
    );
  }

  const {
    title,
    description,
    projectDescription,
    tokenName,
    campaignWord,
    network,
    tokenAddress,
    creator,
    projectName,
    cap,
    impressionReward,
    status,
    endDate,
    duration,
    imageUri,
    startDate,
    leaderRewards,
  } = pool;

  const startedAt =
    Number(startDate) !== 0 && !!startDate ? formatDate(new Date(+startDate * 1000)) : null;
  const endsAt = Number(endDate) !== 0 && !!endDate ? formatDate(new Date(+endDate * 1000)) : null;
  const tokensAwarded = poolStats?.tokensAwarded
    ? Number(transformFromWei(poolStats.tokensAwarded, tokenDecimals))
    : 0;
  const tokensClaimed = poolStats?.tokensClaimed
    ? Number(transformFromWei(poolStats.tokensClaimed, tokenDecimals))
    : 0;

  const projectKeywords = projectName?.split(',').map((item) => item.trim());
  const poolStatus = getStatusDisplayName(status, endDate);

  const bonusContent = (
    <Box display="flex" flexDirection="column">
      {leaderRewards?.map((reward, index) => {
        let emoji;
        switch (index) {
          case 0:
            emoji = '1️⃣st';
            break;
          case 1:
            emoji = '2️⃣nd';
            break;
          case 2:
            emoji = '3️⃣rd';
            break;
          default:
            emoji = `${index + 1}th`;
        }

        return (
          <Text
            key={index}
            textAlign="left"
            fontSize="1.2rem"
            fontWeight="500"
            paddingBottom="2rem"
          >
            {emoji} place bonus:{' '}
            {prettifyNumber(Number(transformFromWei(reward.toString(), tokenDecimals)))}{' '}
            {tokenSymbol}
          </Text>
        );
      })}
      <Text textAlign="left" fontSize="1.2rem" fontWeight="500" paddingBottom="2rem">
        Bonuses settled at the end of each week
      </Text>
    </Box>
  );

  const showBonuses = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_BASIC,
      payload: {
        open: true,
        title: 'Leaderboard bonuses',
        content: bonusContent,
      },
    });
  };

  return (
    <PoolContainer>
      <RoundContainer>
        <Box>
          <PoolTitle>{title}</PoolTitle>
          <List>
            {cap && (
              <ListItem>
                {prettifyNumber(Number(transformFromWei(cap, tokenDecimals)))} {tokenSymbol}
              </ListItem>
            )}
            {impressionReward && (
              <ListItem>
                {transformFromWei(impressionReward, tokenDecimals)} {tokenSymbol} / Impression
              </ListItem>
            )}
            <ListItem>{status && poolStatus}</ListItem>
            {endsAt && <ListItem>ends {endsAt}</ListItem>}
          </List>
          <KeywordWrapper>
            <Box display="flex" alignItems="center" gridGap="0.5rem">
              <Text fontWeight="500" fontSize="1.25rem" paddingRight="5px">
                Required keywords:
              </Text>
              <Tooltip message="Use one of the following keywords" />
              <Box display="flex" alignItems="center" flexWrap="wrap">
                {projectKeywords?.length > 0 &&
                  projectKeywords.map((keyword, i) => (
                    <Box key={`${keyword}-${i}`} display="flex" alignItems="center">
                      <Keyword>{keyword}</Keyword>
                      <Text p={2}>|</Text>
                    </Box>
                  ))}
                {tokenName && <Keyword>{tokenName}</Keyword>}
                {campaignWord && tokenName && <Text p={2}>|</Text>}
                {campaignWord && <Keyword>{campaignWord}</Keyword>}
              </Box>
            </Box>
          </KeywordWrapper>
          <SharePool createdPoolIndex={poolId} poolName={title} />
          {imageUri && (
            <div style={{ width: '100%' }}>
              <PoolImage src={`${fullIpfsUrl(imageUri)}`} />
            </div>
          )}
          {poolStats && (
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
                  title={splitPrettifyNumber(Number(poolStats.impressions || 0))[0]}
                  titleCategory={splitPrettifyNumber(Number(poolStats.impressions || 0))[1]}
                  subtitle="Impressions generated"
                />
              </Stats>
            </Box>
          )}

          <Box pt={4}>
            <CategoryTitle>
              👑
              <Text fontWeight="700" fontSize="1.25rem" lineHeight="26px">
                Weekly Leaderboard
              </Text>
            </CategoryTitle>
            {leaderRewards?.length > 0 && (
              <Box display="flex" justifyContent="center" mb={4}>
                <Button type="button" onClick={showBonuses} variant="info">
                  Show leaderboard bonuses
                </Button>
              </Box>
            )}
            {leaderboard?.length > 0 ? (
              <Leaderboard topAccounts={leaderboard} />
            ) : (
              <Text textAlign="center" fontSize="1.2rem" fontWeight="500">
                A new week has begun, participate now to get ranked!
              </Text>
            )}
          </Box>
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
          {campaignWord && (
            <InfoContainer>
              <InfoHeader>Campaign keyword:</InfoHeader>
              <InfoValue>{campaignWord}</InfoValue>
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

          {endDate && (
            <InfoContainer>
              <InfoHeader>Time left:</InfoHeader>
              <InfoValue>
                {Number(endDate) !== 0 ? getPoolDuration(+endDate) : '(not yet active)'}
              </InfoValue>
            </InfoContainer>
          )}

          <InfoContainer>
            <InfoHeader>Status:</InfoHeader>
            {status && (
              <InfoValue>
                <DotIcon color={getStatusColor(status, endDate)} /> {poolStatus}
              </InfoValue>
            )}
          </InfoContainer>
          {creator && (
            <InfoContainer>
              <InfoHeader>Pool creator:</InfoHeader>
              <InfoValue>
                <AddressValue>{creator}</AddressValue>
              </InfoValue>
            </InfoContainer>
          )}
        </PoolDetailsWrapper>
      </RoundContainer>

      {(poolStatus === PoolStatus.CREATED || poolStatus === PoolStatus.FUNDED) &&
        authenticated &&
        account?.toLowerCase() === creator?.toLowerCase() && (
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
                      You may activate the pool at any time, but once you activate the pool it
                      cannot be deactivated.
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
