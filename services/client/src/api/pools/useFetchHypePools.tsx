import { useQuery } from 'urql';
import { HYPEPOOL_QUERIES } from './query-collector';
import { HypePool } from '../../models';

const hypePoolsPerPage = 6;

interface FetchHypesFilter {
  first: number;
  skip: number;
  orderBy: 'endDate' | 'startDate' | 'creator' | 'remainingFunds' | 'cap';
  orderDirection: 'desc' | 'asc';
  text?: string;
}

const computeFilters = (page: number, search?: string): FetchHypesFilter => {
  const first = hypePoolsPerPage;
  const skip = (page - 1) * hypePoolsPerPage;
  const orderBy = 'endDate';
  const orderDirection = 'desc';

  const filters: FetchHypesFilter = {
    first,
    skip,
    orderBy,
    orderDirection
  };

  if (search) {
    filters.text = `'${search.trim()}'`;
  }

  return filters;
};

export const useFetchHypePools = (page: number, searchString: string) => {
  const query = searchString ? HYPEPOOL_QUERIES.poolsSearchQuery : HYPEPOOL_QUERIES.poolsQuery;
  const computedFilters: FetchHypesFilter = computeFilters(page, searchString);
  const [result] = useQuery({
    query: query,
    variables: computedFilters,
  });

  const { data, fetching, error } = result;

  return {
    data: searchString ? (data?.poolSearch as HypePool[]) : (data?.hypePools as HypePool[]),
    fetching,
    error,
  };
};
