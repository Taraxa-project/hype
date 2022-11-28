import { useParams } from 'react-router-dom';
import Blockies from 'react-blockies';
import { usePoolDetailsEffects } from './PoolDetails.effects';
import {
  CardDescription,
  DataContainer,
  DataHeader,
  DataValue,
} from '../../components/card/Card.styled';
import { transformFromWei, monthDiff } from '../../utils';
import DotIcon from '../../assets/icons/Dot';
import { PoolContainer, CardSubheader, BlockiesContainer, Account } from './PoolDetails.styled';

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
  } = usePoolDetailsEffects(+poolId);
  const duration = `${monthDiff(new Date(), new Date(+endDate))} months left`;

  return (
    <PoolContainer>
      <CardSubheader>Pool creator:</CardSubheader>
      {creator && (
        <BlockiesContainer>
          <Blockies seed={creator} />
          <Account>{creator}</Account>
        </BlockiesContainer>
      )}
      <CardSubheader>Description:</CardSubheader>
      <CardDescription>{description}</CardDescription>
      <CardSubheader>Project description:</CardSubheader>
      <CardDescription>{projectDescription}</CardDescription>
      {projectName && (
        <DataContainer>
          <DataHeader>Project name:</DataHeader>
          <DataValue>{projectName}</DataValue>
        </DataContainer>
      )}
      {word && (
        <DataContainer>
          <DataHeader>Word:</DataHeader>
          <DataValue>{word}</DataValue>
        </DataContainer>
      )}
      {network && (
        <DataContainer>
          <DataHeader>Network:</DataHeader>
          <DataValue>{network}</DataValue>
        </DataContainer>
      )}
      {tokenName && (
        <DataContainer>
          <DataHeader>Token name:</DataHeader>
          <DataValue>{tokenName}</DataValue>
        </DataContainer>
      )}
      {tokenAddress && (
        <>
          <DataHeader>Token contract address:</DataHeader>
          <BlockiesContainer>
            <Blockies seed={tokenAddress} />
            <Account>{tokenAddress}</Account>
          </BlockiesContainer>
        </>
      )}
      {cap && (
        <DataContainer>
          <DataHeader key={`pool-${Date.now()}`}>Total rewards for the pool:</DataHeader>
          <DataValue key={`${cap}-${Date.now()}`}>
            {transformFromWei(cap, tokenDecimals)} {tokenName}
          </DataValue>
        </DataContainer>
      )}
      {minReward && (
        <DataContainer>
          <DataHeader key={`min-${Date.now()}`}>Min reward per winner:</DataHeader>
          <DataValue key={`${minReward}-${Date.now()}`}>
            {transformFromWei(minReward, tokenDecimals)} {tokenName}
          </DataValue>
        </DataContainer>
      )}
      {impressionReward && (
        <DataContainer>
          <DataHeader>Reward per 1,000 impressions:</DataHeader>
          <DataValue>
            {transformFromWei(impressionReward, tokenDecimals)} {tokenName}
          </DataValue>
        </DataContainer>
      )}
      {endDate && duration && (
        <DataContainer>
          <DataHeader key={`duration-${Date.now()}`}>Duration:</DataHeader>
          <DataValue key={`${duration}-${Date.now()}`}>{duration}</DataValue>
        </DataContainer>
      )}
      <DataContainer>
        <DataHeader>Status:</DataHeader>
        {active ? (
          <DataValue key={`active-${Date.now()}`}>
            <DotIcon color="#DDA25D" /> Active
          </DataValue>
        ) : (
          <DataValue key={`active-${Date.now()}`}>
            <DotIcon color="#C2C2C2" /> Inactive
          </DataValue>
        )}
      </DataContainer>
    </PoolContainer>
  );
};
