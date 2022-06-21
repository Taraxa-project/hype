import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Box from '../../components/styles/Box';
import Heading from '../../components/styles/Heading';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { NotAvailable } from '../../components/not-available/NotAvailable';
import { Link } from 'src/components/styles/Link';
import { HypePool } from '../../models';
import Card from '../../components/card/Card';

export const CardContainer = (props: {
  show: number;
  title: string;
  cards: HypePool[];
  emptyMessage: string;
  target: string;
}) => {
  const dispatchModals = useModalsDispatch();
  const hasMore = props.cards.length > props.show;
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
      {hasMore ? (
        <Box
          borderRadius="1rem"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          backgroundColor="greys.1"
          marginBottom="1rem"
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
          <Link href={props.target} text="See all ->" />
        </Box>
      ) : (
        <Heading
          fontSize="1.25rem"
          fontWeight="700"
          lineHeight="1.625rem"
          color="black"
          letterSpacing="-0.02em"
        >
          {props.title}
        </Heading>
      )}
      <Box
        borderRadius="1rem"
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        justifyContent="space-evenly"
        backgroundColor={props.cards.length > 0 ? 'greys.1' : 'greys.0'}
      >
        {props.cards.length > 0 ? (
          props.cards.slice(0, props.show).map((data, i) => (
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
