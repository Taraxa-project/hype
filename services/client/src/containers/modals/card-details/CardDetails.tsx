import {
  CardDescription,
  DataContainer,
  DataHeader,
  DataValue,
} from '../../../components/card/Card.styled';
import {
  ModalAction,
  ModalContainer,
} from '../../../components/modals/modal-container/ModalContainer';
import { ModalTitleProps } from '../../../components/modals/modal-title/ModalTitle';
import { useCardDetailsEffects } from './CardDetails.effects';
import { Account, BlockiesContainer } from './CardDetails.styled';
import Blockies from 'react-blockies';
import useWallet from '../../../hooks/useWallet';
import { monthDiff } from '../../../utils';
import { useToken } from 'wagmi';

export const CardDetails = () => {
  const {
    open,
    title,
    description,
    rewardsAddress,
    creatorAddress,
    pool,
    minReward,
    startDate,
    endDate,
    closeModal,
  } = useCardDetailsEffects();

  const titleProps: ModalTitleProps = {
    title,
    close: closeModal,
  };
  const { isConnected, connect } = useWallet();
  const {
    data: poolTokenInfo,
    isError: poolTokenIsError,
    isLoading: poolTokenIsLoading,
  } = useToken({ address: rewardsAddress });
  const poolToken = poolTokenInfo?.symbol;
  const duration = `${monthDiff(startDate, endDate)} months left`;

  const modalAction: ModalAction = {
    name: 'Connect Wallet',
    onAction: connect,
    disabled: !isConnected,
  };

  return (
    <ModalContainer
      titleProps={titleProps}
      open={open}
      closeModal={closeModal}
      modalAction={modalAction}
    >
      <DataHeader>Pool creator:</DataHeader>
      <BlockiesContainer>
        <Blockies seed="Jeremy" />
        <Account>{creatorAddress}</Account>
      </BlockiesContainer>
      <CardDescription>{description}</CardDescription>
      {pool && poolToken && (
        <DataContainer>
          <DataHeader key={`pool-${Date.now()}`}>Pool:</DataHeader>
          <DataValue key={`${pool}-${Date.now()}`}>
            {pool} {poolToken}
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
      {startDate && endDate && duration && (
        <DataContainer>
          <DataHeader key={`duration-${Date.now()}`}>Duration:</DataHeader>
          <DataValue key={`${duration}-${Date.now()}`}>{duration}</DataValue>
        </DataContainer>
      )}
    </ModalContainer>
  );
};
