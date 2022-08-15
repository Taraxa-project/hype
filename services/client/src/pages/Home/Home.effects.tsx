import { useEffect, useState, useMemo } from 'react';
import { useFetchHypePools } from '../../api/pools/useFetchHypePools';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { HypePool } from '../../models';
import debounce from 'lodash.debounce';

export const useHomeEffects = () => {
  const [searchString, setSearchString] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [hypePools, setHypePools] = useState<HypePool[]>([]);
  const dispatchModals = useModalsDispatch();
  const { data, fetching } = useFetchHypePools(pageNumber, searchString);

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        setPageNumber(pageNumber + 1);
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchString) {
      if (data?.poolSearch) {
        setHypePools(hypePools.concat(data?.poolSearch));
      }
    } else {
      if (data?.hypePools) {
        setHypePools(hypePools.concat(data?.hypePools));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, searchString]);

  const handleChange = (e: any) => {
    setHypePools([]);
    setSearchString(e.target.value);
    setPageNumber(1);
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
    isFetchingNextPage: fetching,
  };
};
