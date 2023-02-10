import { useEffect, useState, useMemo } from 'react';
import { useFetchHypePools } from '../../api/pools/useFetchHypePools';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { HypePool } from '../../models';
import debounce from 'lodash.debounce';

export const useHomeEffects = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [filters, setFilters] = useState<{
    page: number;
    searchString: string;
    maxReached: boolean;
  }>({
    page: 1,
    searchString: '',
    maxReached: false,
  });
  const [hypePools, setHypePools] = useState<HypePool[]>([]);
  const dispatchModals = useModalsDispatch();
  const { data, fetching: isFetchingNextPage } = useFetchHypePools(filters);

  useEffect(() => {
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;
      if (
        !isFetchingNextPage &&
        !filters.maxReached &&
        scrollHeight - scrollTop <= clientHeight * 1.5
      ) {
        setFilters({
          page: filters.page + 1,
          searchString: filters.searchString,
          maxReached: filters.maxReached,
        });
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [isFetchingNextPage, filters]);

  useEffect(() => {
    if (data?.poolSearch?.length === 0 || data?.hypePools?.length === 0) {
      setFilters({
        ...filters,
        maxReached: true,
      });
    }
    if (filters.searchString) {
      if (data?.poolSearch) {
        // setHypePools(hypePools.concat(data?.poolSearch));
        setHypePools(Array.from(new Set(hypePools.concat(data?.poolSearch))));
      }
    } else {
      if (data?.hypePools) {
        // setHypePools(hypePools.concat(data?.poolSearch));
        setHypePools(Array.from(new Set(hypePools.concat(data?.hypePools))));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filters.searchString]);

  useEffect(() => {
    setHypePools([]);
    setFilters({
      page: 1,
      searchString: searchString || '',
      maxReached: false,
    });
  }, [searchString]);

  const handleChange = (e: React.BaseSyntheticEvent) => {
    setSearchString(e.target.value?.trim());
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 350);
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
    filters,
  };
};
