import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { API, FetchHypesFilter, PoolPaginate } from '../types';

const hypePoolsPerPage = 6;

const computePage = (page: number, search?: string): FetchHypesFilter => {
  const take = hypePoolsPerPage;
  const skip = (page - 1) * hypePoolsPerPage;
  return {
    take,
    skip,
    search,
  };
};

const fetchPools = async (params: FetchHypesFilter) => {
  const url = `${API}/pools`;
  try {
    const { data } = await axios.get(url, { params });
    return data as PoolPaginate;
  } catch (err) {
    console.log('Error in fetchPools: ', err);
  }
};

export const useFetchHypePools = (search?: string) => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['pools', search],
    ({ pageParam = 1 }) => fetchPools(computePage(pageParam, search)),
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage?.total / 5;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
      select: (data) => ({ ...data, pages: data.pages.flatMap((page) => page?.data) }),
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
