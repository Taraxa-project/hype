import { useEffect, useState, useMemo } from 'react';
import { useFetchHypePools } from '../../api/pools/useFetchHypePools';
import { HypePool } from '../../models';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';

export const useHomeEffects = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [maxReached, setMaxReached] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hypePools, setHypePools] = useState<HypePool[]>([]);
  let navigate = useNavigate();
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
    if (data) {
      if (data.length === 0 || data.length === 0) {
        setMaxReached(true);
      }
      if (searchString) {
        setHypePools(hypePools.concat(filterInactiveAndExpiredPools(data)));
        // setHypePools(Array.from(new Set(hypePools.concat(data?.poolSearch))));
      } else {
        setHypePools(hypePools.concat(filterInactiveAndExpiredPools(data)));
        // setHypePools(Array.from(new Set(hypePools.concat(data?.hypePools))));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, searchString]);

  const filterInactiveAndExpiredPools = (pools: HypePool[]) => {
    // const now = Date.now(); // get current timestamp in milliseconds
    // return pools.filter((p: HypePool) => p.active === true && +p.endDate * 1000 > now);
    return pools.filter((p: HypePool) => p.remainingFunds !== '0');
  };

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
    navigate(`/pool/${cardData.id}`);
  };

  return {
    debouncedResults,
    hypePools,
    onClick,
    isFetchingNextPage,
  };
};
