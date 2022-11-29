import { useParams } from 'react-router-dom';
import Blockies from 'react-blockies';
import { usePoolDetailsEffects } from './PoolDetails.effects';
import {} from '../../components/card/Card.styled';
import { transformFromWei, monthDiff } from '../../utils';
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
    minReward,
    impressionReward,
    active,
    endDate,
    tokenDecimals,
    isDeposited,
    authenticated,
    fund,
    activate,
  } = usePoolDetailsEffects(+poolId);
  const duration = `${monthDiff(new Date(), new Date(+endDate))} months left`;

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
      {minReward && (
        <InfoContainer>
          <InfoHeader key={`min-${Date.now()}`}>Min reward per winner:</InfoHeader>
          <InfoValue key={`${minReward}-${Date.now()}`}>
            {transformFromWei(minReward, tokenDecimals)} {tokenName}
          </InfoValue>
        </InfoContainer>
      )}
      {impressionReward && (
        <InfoContainer>
          <InfoHeader>Reward per 1,000 impressions:</InfoHeader>
          <InfoValue>
            {transformFromWei(impressionReward, tokenDecimals)} {tokenName}
          </InfoValue>
        </InfoContainer>
      )}
      {endDate && duration && (
        <InfoContainer>
          <InfoHeader key={`duration-${Date.now()}`}>Duration:</InfoHeader>
          <InfoValue key={`${duration}-${Date.now()}`}>{duration}</InfoValue>
        </InfoContainer>
      )}
      <InfoContainer>
        <InfoHeader>Status:</InfoHeader>
        {active ? (
          <InfoValue key={`active-${Date.now()}`}>
            <DotIcon color="#DDA25D" /> Active
          </InfoValue>
        ) : (
          <InfoValue key={`active-${Date.now()}`}>
            <DotIcon color="#C2C2C2" /> Inactive
          </InfoValue>
        )}
      </InfoContainer>
      {!isDeposited ? (
        <Button disabled={!authenticated} size="full-width" type="button" onClick={fund}>
          Fund the Pool
        </Button>
      ) : (
        <Button disabled={!authenticated} size="full-width" type="button" onClick={activate}>
          Activate the Pool
        </Button>
      )}
    </PoolContainer>
  );
};
