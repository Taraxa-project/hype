import { useEffect, useState, useMemo } from 'react';
import { useFetchHypePools } from '../../api/pools/useFetchHypePools';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { HypePool } from '../../models';
import debounce from 'lodash.debounce';

export const useHomeEffects = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [maxReached, setMaxReached] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hypePools, setHypePools] = useState<HypePool[]>([]);
  const dispatchModals = useModalsDispatch();
  const { data, fetching: isFetchingNextPage } = useFetchHypePools(page, searchString);

  useEffect(() => {
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;
      if (!isFetchingNextPage && !maxReached && scrollHeight - scrollTop <= clientHeight * 1.5) {
        setPage(page + 1);
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, maxReached]);

  useEffect(() => {
    if (data?.poolSearch?.length === 0 || data?.hypePools?.length === 0) {
      setMaxReached(true);
    }
    if (searchString) {
      if (data?.poolSearch) {
        setHypePools(hypePools.concat(data?.poolSearch));
        // setHypePools(Array.from(new Set(hypePools.concat(data?.poolSearch))));
      }
    } else {
      if (data?.hypePools) {
        setHypePools(hypePools.concat(data?.hypePools));
        // setHypePools(Array.from(new Set(hypePools.concat(data?.hypePools))));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, searchString]);

  useEffect(() => {
    setSearchString(searchString || '');
    setPage(1);
    setMaxReached(false);
  }, [searchString]);

  const handleChange = (e: React.BaseSyntheticEvent) => {
    setHypePools([]);
    setSearchString(e.target.value);
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
  };
};
