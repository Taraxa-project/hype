import { DataContainer, DataHeader, DataValue } from '../../../components/card/Card.styled';
import {
  ModalAction,
  ModalContainer,
} from '../../../components/modals/modal-container/ModalContainer';
import { ModalTitleProps } from '../../../components/modals/modal-title/ModalTitle';
import { useCardDetailsEffects } from './CardDetails.effects';
import { Account, BlockiesContainer, CardDescription, CardSubheader } from './CardDetails.styled';
import Blockies from 'react-blockies';
import { monthDiff } from '../../../utils';
import { useToken } from 'wagmi';
import useWallet from '../../../hooks/useWallet';
import SuccessIcon from '../../../assets/icons/Success';
import ErrorIcon from '../../../assets/icons/Error';

export const CardDetails = () => {
  const {
    open,
    title,
    description,
    token,
    creator,
    projectName,
    cap,
    minReward,
    active,
    endDate,
    closeModal,
  } = useCardDetailsEffects();

  const titleProps: ModalTitleProps = {
    title,
    close: closeModal,
  };
  const { isConnected, connect } = useWallet();
  const { data: poolTokenInfo } = useToken({ address: token });
  const poolToken = poolTokenInfo?.symbol;
  const duration = `${monthDiff(new Date(), endDate)} months left`;

  const modalAction: ModalAction = {
    name: 'Connect Wallet',
    onAction: connect,
    disabled: isConnected,
    closeButtonVariant: 'primary',
  };

  return (
    <ModalContainer
      titleProps={titleProps}
      open={open}
      closeModal={closeModal}
      modalAction={modalAction}
    >
      <CardSubheader>Pool creator:</CardSubheader>
      <BlockiesContainer>
        <Blockies seed="Jeremy" />
        <Account>{creator}</Account>
      </BlockiesContainer>
      <CardSubheader>Description:</CardSubheader>
      <CardDescription>{description}</CardDescription>
      {projectName && (
        <DataContainer>
          <DataHeader>Project Name:</DataHeader>
          <DataValue>{projectName}</DataValue>
        </DataContainer>
      )}
      {cap && poolToken && (
        <DataContainer>
          <DataHeader key={`pool-${Date.now()}`}>Pool:</DataHeader>
          <DataValue key={`${cap}-${Date.now()}`}>
            {cap} {poolToken}
          </DataValue>
        </DataContainer>
      )}
      {minReward && poolToken && (
        <DataContainer>
          <DataHeader key={`min-${Date.now()}`}>Min reward:</DataHeader>
          <DataValue key={`${minReward}-${Date.now()}`}>
            {minReward} {poolToken}
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
        <DataHeader>Active:</DataHeader>
        {active ? (
          <DataValue key={`active-${Date.now()}`}>
            <SuccessIcon />
          </DataValue>
        ) : (
          <DataValue key={`active-${Date.now()}`}>
            <ErrorIcon />
          </DataValue>
        )}
      </DataContainer>
    </ModalContainer>
  );
};
