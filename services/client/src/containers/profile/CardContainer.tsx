import React from 'react';
import Box from '../../components/styles/Box';
import Heading from '../../components/styles/Heading';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { NotAvailable } from '../../components/not-available/NotAvailable';
import { HypePool } from '../../models';
import Card from '../../components/card/Card';
import styled from 'styled-components';

const StyledCardContainer = styled.div`
  position: relative;
  margin-top: 2rem;
  z-index: 1;
  margin-bottom: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  height: 29.5rem;
  margin-top: 1rem;
  border-radius: 1rem;

  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(19rem, max-content));
  justify-content: start;
  align-items: start;
`;

export const CardContainer = ({
  title,
  cards,
  emptyMessage,
  target,
}: {
  title: string;
  cards: HypePool[];
  emptyMessage: string;
  target: string;
}) => {
  const dispatchModals = useModalsDispatch();

  return (
    <Box
      p="2rem"
      borderRadius="2rem"
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      backgroundColor="greys.1"
      marginBottom="1rem"
      marginRight={{ _: '1rem', sm: '1rem', md: 'none' }}
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
              projectName={data.projectName}
              title={data.title}
              pool={data.pool}
              description={data.description}
              rewardsAddress={data.rewardsAddress}
              creatorAddress={data.creatorAddress}
              minReward={data.minReward}
              startDate={data.startDate}
              endDate={data.endDate}
              onClick={() => {
                dispatchModals({
                  type: ModalsActionsEnum.SHOW_CARD_DETAILS,
                  payload: {
                    open: true,
                    cardData: cards[i],
                  },
                });
              }}
            />
          ))}
        </StyledCardContainer>
      ) : (
        <Box
          borderRadius="1rem"
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
