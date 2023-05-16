import { useEffect, useMemo, useState } from 'react';
import { useGetGroups } from '../../api/group/useGetGroups';
import debounce from 'lodash.debounce';

export const useGroupEffects = () => {
  const [searchString, setSearchString] = useState('');
  const { data, isFetchingNextPage, fetchNextPage } = useGetGroups(searchString);

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight) {
        fetching = true;
        await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return {
    debouncedResults,
    data,
    isFetchingNextPage,
  };
};
