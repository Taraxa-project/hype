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
import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';

export const CardDetails = () => {
  const {
    open,
    title,
    creatorAddress,
    description,
    pool,
    poolToken,
    bonus,
    bonusToken,
    minReward,
    rewardToken,
    duration,
    closeModal,
  } = useCardDetailsEffects();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { account, activateBrowserWallet } = useEthers();

  useEffect(() => {
    setIsConnected(account !== undefined);
  }, [account]);


  const titleProps: ModalTitleProps = {
    title,
    close: closeModal,
  };

  const modalAction: ModalAction = {
    name: 'Connect Wallet',
    onAction: activateBrowserWallet,
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
      {bonus && bonusToken && (
        <DataContainer>
          <DataHeader key={`bonus-${Date.now()}`}>Bonus:</DataHeader>
          <DataValue key={`${bonus}-${Date.now()}`}>
            {bonus} {bonusToken}
          </DataValue>
        </DataContainer>
      )}
      {minReward && rewardToken && (
        <DataContainer>
          <DataHeader key={`min-${Date.now()}`}>Min reward:</DataHeader>
          <DataValue key={`${minReward}-${Date.now()}`}>
            {minReward} {rewardToken}
          </DataValue>
        </DataContainer>
      )}
      {duration && (
        <DataContainer>
          <DataHeader key={`duration-${Date.now()}`}>Duration:</DataHeader>
          <DataValue key={`${duration}-${Date.now()}`}>{duration}</DataValue>
        </DataContainer>
      )}
    </ModalContainer>
  );
};
