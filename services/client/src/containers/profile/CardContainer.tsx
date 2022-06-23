import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Box from '../../components/styles/Box';
import Heading from '../../components/styles/Heading';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { NotAvailable } from '../../components/not-available/NotAvailable';
import { HypePool } from '../../models';
import Card from '../../components/card/Card';

export const CardContainer = (props: {
  title: string;
  cards: HypePool[];
  emptyMessage: string;
  target: string;
}) => {
  const dispatchModals = useModalsDispatch();
  const isMobile = useMediaQuery({ query: `(max-width: 950px)` });

  return (
    <Box
      p="1rem"
      borderRadius="1rem"
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      backgroundColor="greys.1"
      marginBottom="1rem"
      marginRight={isMobile ? '1rem' : 'none'}
    >
      <Heading
        fontSize="1.25rem"
        fontWeight="700"
        lineHeight="1.625rem"
        color="black"
        letterSpacing="-0.02em"
      >
        {props.title}
      </Heading>
      <Box
        borderRadius="1rem"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-evenly"
        backgroundColor={props.cards.length > 0 ? 'greys.1' : 'greys.0'}
        overflowY="auto"
        overflowX="hidden"
        height="29.5rem"
      >
        {props.cards.length > 0 ? (
          props.cards.map((data, i) => (
            <Card
              variant={isMobile ? 'mobile' : 'desktop'}
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
                    cardData: props.cards[i],
                  },
                });
              }}
            />
          ))
        ) : (
          <NotAvailable message={props.emptyMessage} />
        )}
      </Box>
    </Box>
  );
};
