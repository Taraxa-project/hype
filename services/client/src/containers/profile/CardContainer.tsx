import React from 'react';
import Box from '../../components/styles/Box';
import Heading from '../../components/styles/Heading';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { NotAvailable } from '../../components/not-available/NotAvailable';
import { HypePool } from '../../models';
import Card from '../../components/card/Card';
import styled from 'styled-components';
import { ModalAction } from '../../components/modals/modal-container/ModalContainer';

const StyledCardContainer = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  height: 25rem;
  margin-top: 1rem;
  border-radius: 1rem;

  display: grid;
  grid-gap: 2rem;
  // grid-template-columns: repeat(auto-fill, minmax(19rem, max-content));
  grid-template-columns: repeat(auto-fill, minmax(18.75rem, 1fr));
  justify-content: start;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: 0;
  }
`;

export const CardContainer = ({
  title,
  cards,
  emptyMessage,
  target,
  poolModalAction,
  isPrivate,
}: {
  title: string;
  cards: HypePool[];
  emptyMessage: string;
  target: string;
  poolModalAction: ModalAction;
  isPrivate?: boolean;
}) => {
  const dispatchModals = useModalsDispatch();

  return (
    <Box
      p={{ _: '1.5rem', sm: '1.5rem', md: '2rem' }}
      borderRadius="10px"
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      backgroundColor="greys.1"
    >
      <Heading
        fontSize="1.25rem"
        fontWeight="700"
        lineHeight="1.625rem"
        color="black"
        letterSpacing="-0.02em"
      >
        {title}
      </Heading>
      {cards.length > 0 ? (
        <StyledCardContainer>
          {cards.map((data, i) => (
            <Card
              key={`${data.title}-${i}`}
              pool={data}
              onClick={() => {
                dispatchModals({
                  type: ModalsActionsEnum.SHOW_CARD_DETAILS,
                  payload: {
                    open: true,
                    cardData: cards[i],
                    cardModalAction: poolModalAction,
                    isPrivate,
                  },
                });
              }}
            />
          ))}
        </StyledCardContainer>
      ) : (
        <Box
          borderRadius="10px"
          display="flex"
          flexWrap="wrap"
          justifyContent="space-evenly"
          gridGap="2rem"
          height="12rem"
          mt="1rem"
          backgroundColor={cards.length > 0 ? 'greys.1' : 'greys.0'}
        >
          <NotAvailable message={emptyMessage} />
        </Box>
      )}
    </Box>
  );
};
