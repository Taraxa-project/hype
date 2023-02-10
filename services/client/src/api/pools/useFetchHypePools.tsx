import { FetchHypesFilter } from '../types';
import { useQuery } from 'urql';
import { HYPEPOOL_QUERIES } from './query-collector';

const hypePoolsPerPage = 6;

const computeFilters = (page: number, search?: string): FetchHypesFilter => {
  const first = hypePoolsPerPage;
  const skip = (page - 1) * hypePoolsPerPage;

  const filters: FetchHypesFilter = {
    first,
    skip,
  };

  if (search) {
    filters.text = `'${search}'`;
  }

  return filters;
};

export const useFetchHypePools = (filters: { page: number; searchString: string }) => {
  const query = filters.searchString
    ? HYPEPOOL_QUERIES.poolsSearchQuery
    : HYPEPOOL_QUERIES.poolsQuery;
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
