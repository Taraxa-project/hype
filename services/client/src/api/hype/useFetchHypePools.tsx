import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { OrderDirection, PoolOrderByEnum } from '../../utils';
import { HypePool } from '../../models';

export interface FetchHypesFilter {
  take: number;
  skip: number;
//   search?: string;
//   orderBy?: PoolOrderByEnum;
//   order?: OrderDirection;
}

export interface PoolPaginate {
  data: HypePool[];
  total: number;
}

const hypePoolsPerPage = 5;

const computePage = (page: number) => {
  const take = page * hypePoolsPerPage;
  const skip = take - hypePoolsPerPage;
  return {
    take,
    skip,
  };
};

const fetchPools = async (params: FetchHypesFilter) => {
  const url = `${process.env.REACT_APP_API_HOST}/api/pools`;
  const { data } = await axios.get(url, { params });
  return data as PoolPaginate;
};

export const useFetchHypePools = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery(
    'pools',
    ({ pageParam = 1 }) => fetchPools(computePage(pageParam)),
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage.total / 5;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
      select: data => ({ ...data, pages: data.pages.flatMap(page => page.data) })
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
