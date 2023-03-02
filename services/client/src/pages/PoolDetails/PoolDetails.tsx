import { useParams } from 'react-router-dom';
import Blockies from 'react-blockies';
import { usePoolDetailsEffects } from './PoolDetails.effects';
import { transformFromWei, formatDate } from '../../utils';
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
import TitleText from '../../components/titletext/TitleText';
import Button from '../../components/button/Button';
import Box from '../../components/styles/Box';

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
  } = usePoolDetailsEffects(poolId);
  const startedAt = startDate ? formatDate(new Date(+startDate * 1000)) : '(not yet active)';
  const endsAt = endDate ? formatDate(new Date(+endDate * 1000)) : '(not yet active)';

  return (
    <PoolContainer>
      <TitleText>{title}</TitleText>
      <Subheader>Pool creator:</Subheader>
      {creator && (
        <BlockiesContainer>
          <Blockies seed={creator} />
          <Account>{creator}</Account>
        </BlockiesContainer>
      )}
      <Subheader>Description:</Subheader>
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
          <InfoHeader>Word:</InfoHeader>
          <InfoValue>{word}</InfoValue>
        </InfoContainer>
      )}
      {network && (
        <InfoContainer>
          <InfoHeader>Network:</InfoHeader>
          <InfoValue>{network}</InfoValue>
        </InfoContainer>
      )}
      {tokenName && (
        <InfoContainer>
          <InfoHeader>Token name:</InfoHeader>
          <InfoValue>{tokenName}</InfoValue>
        </InfoContainer>
      )}
      {tokenAddress && (
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
            <Button
              disabled={!authenticated}
              size="full-width"
              variant="success"
              type="button"
              onClick={activate}
            >
              Activate the Pool
            </Button>
          )}
        </Box>
      )}
    </PoolContainer>
  );
};
