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
import { formatDate, transformFromWei } from '../../../utils';
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
    impressionReward,
    active,
    endDate,
    startDate,
    closeModal,
    onRedirect,
    tokenDecimals,
    isPrivate,
    onParticipate,
  } = useCardDetailsEffects();

  const titleProps: ModalTitleProps = {
    title,
    close: closeModal,
  };
  const startedAt =
    Number(startDate) !== 0 ? formatDate(new Date(+startDate * 1000)) : '(not yet active)';
  const endsAt = Number(endDate) !== 0 ? formatDate(new Date(+endDate * 1000)) : '(not yet active)';

  const poolModalAction: ModalAction = {
    name: 'Go to Pool details page',
    onAction: onRedirect,
    closeButtonVariant: 'primary',
  };
  const participateModalAction: ModalAction = {
    name: '📣 Participate Now!',
    onAction: onParticipate,
    closeButtonVariant: 'primary',
  };
  const modalActions: ModalAction[] = [];

  if (isPrivate) {
    modalActions.push(poolModalAction);
  } else {
    modalActions.push(participateModalAction);
  }
  return (
    <ModalContainer
      titleProps={titleProps}
      open={open}
      closeModal={closeModal}
      modalActions={modalActions}
      // height='42rem' // This is usefull when adding two buttons
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
        {tokenAddress && tokenAddress !== '0x0000000000000000000000000000000000000000' && (
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
        {impressionReward && (
          <DataContainer>
            <DataHeader key={`min-${Date.now()}`}>Reward /impression:</DataHeader>
            <DataValue key={`${impressionReward}-${Date.now()}`}>
              {transformFromWei(impressionReward, tokenDecimals)} {tokenName}
            </DataValue>
          </DataContainer>
        )}
        <DataContainer>
          <DataHeader key={`startDate-${Date.now()}`}>Start Date:</DataHeader>
          <DataValue key={`${startDate}-${Date.now()}`}>{startedAt}</DataValue>
        </DataContainer>
        <DataContainer>
          <DataHeader key={`endDate-${Date.now()}`}>End Date:</DataHeader>
          <DataValue key={`${endDate}-${Date.now()}`}>{endsAt}</DataValue>
        </DataContainer>
        <DataContainer>
          <DataHeader>Status:</DataHeader>
          {active ? (
            <DataValue key={`active-${Date.now()}`}>
              <DotIcon color="#15AC5B" /> Active
            </DataValue>
          ) : (
            <DataValue key={`active-${Date.now()}`}>
              <DotIcon color="#C2C2C2" /> (not yet active)
            </DataValue>
          )}
        </DataContainer>
      </CardInnerContainer>
    </ModalContainer>
  );
};
