import { useEffect, useState, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';
import { useFetchHypePools } from '../../api/pools/useFetchHypePools';
import { HypePool, PoolStatus } from '../../models';
import { getStatusDisplayName } from '../../utils/pools';

export const useHomeEffects = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [maxReached, setMaxReached] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hypePools, setHypePools] = useState<HypePool[]>([]);
  let navigate = useNavigate();
  const { data, fetching: isFetchingNextPage } = useFetchHypePools(page, isActive, searchString);

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
      if (data.length === 0) {
        setMaxReached(true);
      }
      if (searchString) {
        const filteredPools = data.filter((pool) => {
          const status = getStatusDisplayName(pool.status, pool.endDate);
          const isActivePool = status === PoolStatus.STARTED;
          const isInactivePool = status === PoolStatus.EXPIRED || status === PoolStatus.ENDED;
          return isActive ? isActivePool : isInactivePool;
        });
        setHypePools((prevPools) => {
          const filteredNewPools = filteredPools.filter(
            (newPool) => !prevPools.find((pool) => pool.id === newPool.id),
          );
          return [...prevPools, ...filteredNewPools];
        });
      } else {
        setHypePools((prevPools) => {
          const filteredNewPools = data.filter(
            (newPool) => !prevPools.find((pool) => pool.id === newPool.id),
          );
          return [...prevPools, ...filteredNewPools];
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, searchString]);

  const handleChange = (e: React.BaseSyntheticEvent) => {
    setHypePools([]);
    setSearchString(e.target.value || '');
    setPage(1);
    setMaxReached(false);
    // setIsActive(true);
  };

  const toggleActive = (active: boolean) => {
    setHypePools([]);
    setIsActive(active);
    // setSearchString('');
    setPage(1);
    setMaxReached(false);
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
    toggleActive,
    isActive,
    searchString,
  };
};
