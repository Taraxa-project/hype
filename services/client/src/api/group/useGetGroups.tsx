import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { API } from '../../constants';
import { GroupPaginate, FetchGroupFilter } from '../../models';

const groupsPerPage = 50;

const getGroups = async (params: FetchGroupFilter) => {
  const url = `${API}/group`;
  const { data } = await axios.get(url, { params });
  return data as GroupPaginate;
};

const computePage = (page: number, search?: string): FetchGroupFilter => {
  const take = page * groupsPerPage;
  const skip = take - groupsPerPage;
  return {
    take,
    skip,
    search,
  };
};

export const useGetGroups = (search?: string) => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['telegram-groups', search],
    ({ pageParam = 1 }) => getGroups(computePage(pageParam, search)),
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage.total / 5;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
      select: (data) => ({ ...data, pages: data.pages.flatMap((page) => page.data) }),
    },
  );

  return {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};
