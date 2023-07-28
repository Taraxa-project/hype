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
import { formatDate, networks, transformFromWei } from '../../../utils';
import DotIcon from '../../../assets/icons/Dot';
import { getStatusColor, getStatusDisplayName } from '../../../utils/pools';

export const CardDetails = () => {
  const {
    open,
    title,
    description,
    projectDescription,
    tokenName,
    tokenSymbol,
    campaignWord,
    network,
    tokenAddress,
    creator,
    projectName,
    cap,
    impressionReward,
    status,
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
      // height='42rem' // This is useful when adding two buttons
    >
      <CardInnerContainer>
        <CardSubheader>Pool creator:</CardSubheader>
        {creator && (
          <BlockiesContainer>
            <Blockies seed={creator} />
            <Account>{creator}</Account>
          </BlockiesContainer>
        )}
        <CardSubheader>Campaign Description:</CardSubheader>
        <CardDescription>{description}</CardDescription>
        <CardSubheader>Project description:</CardSubheader>
        <CardDescription>{projectDescription}</CardDescription>
        {projectName && (
          <DataContainer>
            <DataHeader>Project name:</DataHeader>
            <DataValue>{projectName}</DataValue>
          </DataContainer>
        )}
        {campaignWord && (
          <DataContainer>
            <DataHeader>Campaign keyword:</DataHeader>
            <DataValue>{campaignWord}</DataValue>
          </DataContainer>
        )}
        {network && (
          <DataContainer>
            <DataHeader>Network:</DataHeader>
            <DataValue>{networks[network].chainName}</DataValue>
          </DataContainer>
        )}
        {tokenName && (
          <DataContainer>
            <DataHeader>Project Token name:</DataHeader>
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
            <DataHeader>Total rewards for the pool:</DataHeader>
            <DataValue>
              {transformFromWei(cap, tokenDecimals)} {tokenSymbol}
            </DataValue>
          </DataContainer>
        )}
        {impressionReward && (
          <DataContainer>
            <DataHeader>Reward /impression:</DataHeader>
            <DataValue>
              {transformFromWei(impressionReward, tokenDecimals)} {tokenSymbol}
            </DataValue>
          </DataContainer>
        )}
        <DataContainer>
          <DataHeader>Start Date:</DataHeader>
          <DataValue>{startedAt}</DataValue>
        </DataContainer>
        <DataContainer>
          <DataHeader>End Date:</DataHeader>
          <DataValue>{endsAt}</DataValue>
        </DataContainer>
        <DataContainer>
          <DataHeader>Status:</DataHeader>
          {status && (
            <DataValue>
              <DotIcon color={getStatusColor(status)} /> {getStatusDisplayName(status)}
            </DataValue>
          )}
        </DataContainer>
      </CardInnerContainer>
    </ModalContainer>
  );
};
