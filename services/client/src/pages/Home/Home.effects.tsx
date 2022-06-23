import { useEffect, useState, useMemo } from 'react';
import { useFetchHypePools } from '../../api/hype/useFetchHypePools';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { HypePool } from '../../models';
import debounce from 'lodash.debounce';

export const useHomeEffects = () => {
  const [searchString, setSearchString] = useState('');
  const dispatchModals = useModalsDispatch();
  const { data, isFetchingNextPage, fetchNextPage } = useFetchHypePools(searchString);

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

  const handleChange = (e: any) => {
    setSearchString(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

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
    debouncedResults,
    data,
    onClick,
    isFetchingNextPage,
  };
};
