import { FetchHypesFilter } from '../types';
import { useQuery } from 'urql';

const hypePoolsPerPage = 3;

const computeFilters = (page: number, search?: string): FetchHypesFilter => {
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

export const useFetchHypePools = (filters: { page: number; searchString: string }) => {
  const query = filters.searchString ? poolsSearchQuery : poolsQuery;
  const computedFilters: FetchHypesFilter = computeFilters(filters.page, filters.searchString);
  const [result] = useQuery({
    query: query,
    variables: computedFilters,
  });

  const { data, fetching, error } = result;

  return {
    data,
    fetching,
    error,
  };
};
