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
import { useNetwork, useToken } from 'wagmi';
import useWallet from '../../../hooks/useWallet';
import DotIcon from '../../../assets/icons/Dot';

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
  const { chain } = useNetwork();
  const { data: poolTokenInfo } = useToken({ address: token, enabled: chain?.name === 'Ethereum' });
  const poolToken = poolTokenInfo?.symbol;
  const duration = `${monthDiff(new Date(), new Date(+endDate))} months left`;

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
      {cap && (
        <DataContainer>
          <DataHeader key={`pool-${Date.now()}`}>Pool:</DataHeader>
          <DataValue key={`${cap}-${Date.now()}`}>
            {cap} {poolToken}
          </DataValue>
        </DataContainer>
      )}
      {minReward && (
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
    </ModalContainer>
  );
};
