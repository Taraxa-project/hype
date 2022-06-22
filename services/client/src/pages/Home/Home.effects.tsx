import { useEffect, useState } from 'react';
import { FetchHypesFilter, useFetchHypePools } from '../../api/hype/useFetchHypePools';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { HypePool } from '../../models';

const hypePoolsStep = 5;

export const useHomeEffects = () => {
  const [filters, setFilters] = useState<FetchHypesFilter>({ take: hypePoolsStep, skip: 0 });
  const [searchString, setSearchString] = useState('');
  const dispatchModals = useModalsDispatch();
  const { data, isFetchingNextPage, fetchNextPage } = useFetchHypePools();

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  const onClick = (cardData: HypePool) => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_CARD_DETAILS,
      payload: {
        open: true,
        cardData,
      },
    });
  };

  return {
    setSearchString,
    data,
    onClick,
    isFetchingNextPage,
  };
};
