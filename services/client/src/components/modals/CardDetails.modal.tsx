import { useModal } from 'src/hooks/useModal';
import {
  CardDescription,
  CardTitle,
  DataContainer,
  DataHeader,
  DataValue,
} from '../card/Card.styled';
import Blockies from 'react-blockies';
import Button from '../button/Button';
import useMetamask from 'src/hooks/useMetamask';
import CloseIcon from 'src/assets/icons/Close';
import {
  Account,
  BlockiesContainer,
  ButtonDiv,
  StyledModal,
  TitleContainer,
} from './CardDetails.styed';
import { CardData } from '../card/Card';

interface ExtendedDetailsProps {
  cardData: CardData;
}

const CardDetailsModal = ({ cardData }: ExtendedDetailsProps) => {
  const {
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
          <Button size="full-width" onClick={connect} disabled={status === 'connected'}>
            Connect Wallet
          </Button>
        </StyledModal>
      )}
    </>
  );
};

export default CardDetailsModal;
