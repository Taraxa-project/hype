import { DataContainer, DataHeader, DataValue } from '../../../components/card/Card.styled';
import {
  ModalAction,
  ModalContainer,
} from '../../../components/modals/modal-container/ModalContainer';
import { ModalTitleProps } from '../../../components/modals/modal-title/ModalTitle';
import { useCardDetailsEffects } from './CardDetails.effects';
import {
  Account,
  BlockiesContainer,
  CardDescription,
  CardSubheader,
  CardInnerContainer,
} from './CardDetails.styled';
import Blockies from 'react-blockies';
import { monthDiff } from '../../../utils';
import useWallet from '../../../hooks/useWallet';
import DotIcon from '../../../assets/icons/Dot';

export const CardDetails = () => {
  const {
    open,
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
    closeModal,
    onRedirect,
  } = useCardDetailsEffects();

  const titleProps: ModalTitleProps = {
    title,
    close: closeModal,
  };
  const { isConnected, connect } = useWallet();
  const duration = `${monthDiff(new Date(), new Date(+endDate))} months left`;

  const modalAction: ModalAction = {
    name: 'Connect Wallet',
    onAction: connect,
    disabled: isConnected,
    closeButtonVariant: 'primary',
  };

  const poolModalAction: ModalAction = {
    name: 'Go to Pool details page',
    onAction: onRedirect,
    closeButtonVariant: 'primary',
  };

  return (
    <ModalContainer
      titleProps={titleProps}
      open={open}
      closeModal={closeModal}
      modalAction={isConnected === true ? poolModalAction : modalAction}
    >
      <CardInnerContainer>
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
              {cap} {tokenName}
            </DataValue>
          </DataContainer>
        )}
        {minReward && (
          <DataContainer>
            <DataHeader key={`min-${Date.now()}`}>Min reward per winner:</DataHeader>
            <DataValue key={`${minReward}-${Date.now()}`}>
              {minReward} {tokenName}
            </DataValue>
          </DataContainer>
        )}
        {impressionReward && (
          <DataContainer>
            <DataHeader key={`min-${Date.now()}`}>Reward per 1,000 impressions:</DataHeader>
            <DataValue key={`${impressionReward}-${Date.now()}`}>
              {impressionReward} {tokenName}
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
      </CardInnerContainer>
    </ModalContainer>
  );
};
