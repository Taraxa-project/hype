import { useEffect, useState } from 'react';
import Card from 'src/components/card/Card';
import { FetchHypesFilter, useFetchData } from '../../api/hype/useFetchData';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { HypePool } from '../../models';

export const useHomeEffects = () => {
  const [cardData, setCardData] = useState<HypePool[]>([]);
  const [filters, setFilters] = useState<FetchHypesFilter>({ take: 10, skip: 0 });
  const [searchString, setSearchString] = useState('');
  const dispatchModals = useModalsDispatch();
  const { data, error, isLoading, isError } = useFetchData(filters);
  console.log('data: ', data);
  console.log('isLoading: ', isLoading);
  console.log('ERROR: ', error, isError);

  useEffect(() => {
    const currCards = cardData;
    setCardData(currCards.concat(data));
    console.log('DATA: ', data);
  }, [data]);

  const addMoreCards = () => {
    const newTake = filters.take + 10;
    const newSkip = filters.skip + 10;
    setFilters({ take: newTake, skip: newSkip });
  };

  const filteredCards = cardData.map(
    (data, i) =>
      data && (
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
                cardData: cardData[i],
              },
            });
          }}
        />
      ),
  );

  return {
    setSearchString,
    addMoreCards,
    filteredCards,
    cardData,
  };
};
