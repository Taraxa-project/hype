import { FetchHypesFilter, PoolPaginate } from '../types';
import { useQuery } from 'urql';

const hypePoolsPerPage = 3;

const computePage = (page: number, search?: string): FetchHypesFilter => {
  const first = hypePoolsPerPage;
  const skip = (page - 1) * hypePoolsPerPage;

  const filters: FetchHypesFilter = {
    first,
    skip,
  };

  if (search) {
    filters.text = search;
  }

  return filters;
};

const poolsSearchQuery = `
  query($first: Int!, $skip: Int!, $text: String) {
    poolSearch(first: $first, skip: $skip, text: $text) {
      id
      title
      projectName
      description
      active
      uri
      token
      cap
      creator
      endDate
      minReward
    }
  }
`;

const poolsQuery = `
  query($first: Int!, $skip: Int!, $text: String) {
    hypePools(first: $first, skip: $skip, text: $text) {
      id
      title
      projectName
      description
      active
      uri
      token
      cap
      creator
      endDate
      minReward
    }
  }
`;

export const useFetchHypePools = (pageNumber: number, search?: string) => {
  const page = search ? 1 : pageNumber;
  const query = search ? poolsSearchQuery : poolsQuery;
  const filters: FetchHypesFilter = computePage(page, search);
  const [{ data, fetching, error }] = useQuery({
    query: query,
    variables: filters,
  });

  console.log('useFetchHypePools result: ', data, fetching, error);

  return {
    data,
    fetching,
    error,
  };
};
