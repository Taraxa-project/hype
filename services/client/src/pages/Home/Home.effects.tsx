import { useEffect, useState, useMemo } from 'react';
import { useFetchHypePools } from '../../api/pools/useFetchHypePools';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { HypePool } from '../../models';
import debounce from 'lodash.debounce';

export const useHomeEffects = () => {
  const [filters, setFilters] = useState<{ page: number; searchString: string }>({
    page: 1,
    searchString: '',
  });
  const [hypePools, setHypePools] = useState<HypePool[]>([]);
  const dispatchModals = useModalsDispatch();
  const { data, fetching: isFetchingNextPage } = useFetchHypePools(filters);

  useEffect(() => {
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;
      if (!isFetchingNextPage && scrollHeight - scrollTop <= clientHeight * 1.5) {
        setFilters({
          page: filters.page + 1,
          searchString: filters.searchString,
        });
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage]);

  useEffect(() => {
    if (filters.searchString) {
      if (data?.poolSearch) {
        setHypePools(hypePools.concat(data?.poolSearch));
      }
    } else {
      if (data?.hypePools) {
        setHypePools(hypePools.concat(data?.hypePools));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filters.searchString]);

  const handleChange = (e: any) => {
    setHypePools([]);
    setFilters({
      page: 1,
      searchString: e.target.value,
    });
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
    hypePools,
    onClick,
    isFetchingNextPage,
  };
};
