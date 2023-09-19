import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { useGetGroups } from '../../api/group/useGetGroups';
import { TelegramGroup } from '../../models';

export const useGroupEffects = () => {
  const [searchString, setSearchString] = useState('');
  const { data, isFetchingNextPage, fetchNextPage } = useGetGroups(searchString);

  const columns: { path: string; name: string }[] = [
    { path: 'groupUsername', name: 'ID' },
    { path: 'groupTitle', name: 'Group Name' },
    { path: 'memberCount', name: 'Members' },
    { path: 'totalMessages', name: 'Total Messages' },
    { path: 'createdAt', name: 'Indexing started on' },
  ];
  const rows: {
    data: any[];
  }[] = [];

  data?.pages.map((group: TelegramGroup) => {
    return rows.push({
      data: [
        {
          groupUsername: `@${group.groupUsername}`,
          groupTitle: group.groupTitle,
          memberCount: group.memberCount,
          totalMessages: group.totalMessages,
          createdAt: group.createdAt ? new Date(group.createdAt).toDateString() : 'NA',
        },
      ],
    });
  });

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
    columns,
    rows,
    debouncedResults,
    isFetchingNextPage,
  };
};
