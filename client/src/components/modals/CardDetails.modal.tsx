import { useModal } from 'src/hooks/useModal';
import {
  CardData,
  CardDescription,
  CardTitle,
  DataContainer,
  DataHeader,
  DataValue,
} from '../card/Card';
import Blockies from 'react-blockies';
import Button from '../button/Button';
import useMetamask from 'src/hooks/useMetamask';
import CloseIcon from 'src/assets/icons/Close';
import { Account, BlockiesContainer, ButtonDiv, StyledModal, TitleContainer } from './CardDetails.styed';

interface ExtendedDetailsProps {
  cardData: CardData;
}

const CardDetailsModal = ({cardData} : ExtendedDetailsProps) => {
  const {
    title,
    creatorAddress,
    description,
    poolAmount,
    poolToken,
    bonusAmount,
    bonusToken,
    minRewardAmount,
    minRewardToken,
    duration,
  } = cardData;
  const { isOpen, close } = useModal();
  const { connect, status } = useMetamask();
  return (
    <>
      {isOpen && (
        <StyledModal>
          <TitleContainer>
            <CardTitle>{title}</CardTitle>
            <ButtonDiv onClick={close}>
              <CloseIcon />
            </ButtonDiv>
          </TitleContainer>
          <DataHeader>Pool creator:</DataHeader>
          <BlockiesContainer>
            <Blockies seed="Jeremy" />
            <Account>{creatorAddress}</Account>
          </BlockiesContainer>
          <CardDescription>{description}</CardDescription>
          {poolAmount && poolToken && (
            <DataContainer>
              <DataHeader key={`pool-${Date.now()}`}>Pool:</DataHeader>
              <DataValue key={`${poolAmount}-${Date.now()}`}>
                {poolAmount} {poolToken}
              </DataValue>
            </DataContainer>
          )}
          {bonusAmount && bonusToken && (
            <DataContainer>
              <DataHeader key={`bonus-${Date.now()}`}>Bonus:</DataHeader>
              <DataValue key={`${bonusAmount}-${Date.now()}`}>
                {bonusAmount} {bonusToken}
              </DataValue>
            </DataContainer>
          )}
          {minRewardAmount && minRewardToken && (
            <DataContainer>
              <DataHeader key={`min-${Date.now()}`}>Min reward:</DataHeader>
              <DataValue key={`${minRewardAmount}-${Date.now()}`}>
                {minRewardAmount} {minRewardToken}
              </DataValue>
            </DataContainer>
          )}
          {duration && (
            <DataContainer>
              <DataHeader key={`duration-${Date.now()}`}>Duration:</DataHeader>
              <DataValue key={`${duration}-${Date.now()}`}>{duration}</DataValue>
            </DataContainer>
          )}
          {status !== 'connected' && (
            <Button size="full-width" onClick={connect}>
              Connect Wallet
            </Button>
          )}
        </StyledModal>
      )}
    </>
  );
};

export default CardDetailsModal;
