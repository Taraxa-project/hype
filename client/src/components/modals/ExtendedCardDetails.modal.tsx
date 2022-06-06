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
import styled from 'styled-components';
import Button from '../button/Button';
import useMetamask from 'src/hooks/useMetamask';
import CloseIcon from 'src/assets/icons/Close';

interface ExtendedDetailsProps {
  cardData: CardData;
}

const StyledModal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1040;
  backdrop-filter: blur(1rem);
  width: 25%;
  height: 60%;
  background: #f7f7f7;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  padding: 2rem;
`;

export const Account = styled.div`
  background: #ececec;
  border-radius: 1.625rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  color: #787878;
  padding: 0.375rem 1.5rem;
  margin-left: 2rem;
`;

export const BlockiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  margin-top: 1rem;
  padding-right: 3rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  vertical-align: top;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 0;
`;

const ButtonDiv = styled.div`
  cursor: pointer;
`;

const CardDetailsModal = (props: ExtendedDetailsProps) => {
  const { cardData } = props;
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
          {status === 'notConnected' && (
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
