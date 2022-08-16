import {
  ModalAction,
  ModalContainer,
} from '../../../components/modals/modal-container/ModalContainer';
import { ModalTitleProps } from '../../../components/modals/modal-title/ModalTitle';
import Blockies from 'react-blockies';
import { usePoolCreatedEffects } from './PoolCreated.effects';
import HourglassIcon from '../../../assets/icons/Hourglass';
import { Account, BlockiesContainer, InfoCard, PoolContent } from './PoolCreated.styled';
import Text from '../../../components/styles/Text';

export const PoolCreated = () => {
  const { open, pool, closeModal, onLockRewards } = usePoolCreatedEffects();

  const titleProps: ModalTitleProps = {
    title: 'You`re all set! Check submitted data:',
    close: closeModal,
    icon: <HourglassIcon />,
  };

  const modalAction: ModalAction = {
    name: 'Confirm and Lock in Reward Pool',
    onAction: onLockRewards,
    closeButtonVariant: 'primary',
    maxWidth: '100%',
  };

  return (
    <ModalContainer
      titleProps={titleProps}
      open={open}
      closeModal={closeModal}
      modalAction={modalAction}
      showCancel={true}
      height="47.5rem"
    >
      <PoolContent>
        {pool?.projectName && (
          <>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Project Name:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {pool?.projectName?.toUpperCase()}
            </Text>
          </>
        )}

        {pool?.title && (
          <>
            <Text pt={3} fontSize="0.875rem" fontWeight="700" color="greys.7">
              Hype pool name:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {pool?.title?.toUpperCase()}
            </Text>
          </>
        )}

        {pool?.description && (
          <>
            <Text pt={3} fontSize="0.875rem" fontWeight="700" color="greys.7">
              What are you hyping:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {pool?.description}
            </Text>
          </>
        )}

        {pool?.token && (
          <>
            <Text py={3} fontSize="0.875rem" fontWeight="700" color="greys.7">
              Token contract address:
            </Text>

            <BlockiesContainer>
              <Blockies seed={pool.token} />
              <Account>{pool.token}</Account>
            </BlockiesContainer>
          </>
        )}

        <InfoCard>
          Once a pool is created, it is committed on-chain. This means the funds cannot be
          withdrawn, and the parameters of the pool cannot be altered. This is to ensure that Hype
          pools are transparent and fair to your community.
        </InfoCard>
      </PoolContent>
    </ModalContainer>
  );
};
