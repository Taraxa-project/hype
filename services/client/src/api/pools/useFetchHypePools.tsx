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
  endDate_gt?: number;
  endDate_lt?: number;
}

const computeFilters = (page: number, active: boolean, search?: string): FetchHypesFilter => {
  const first = hypePoolsPerPage;
  const skip = (page - 1) * hypePoolsPerPage;
  const orderBy = 'endDate';
  const orderDirection = 'desc';

  const currentTimestamp = Math.floor(Date.now() / 1000);

  const filters: FetchHypesFilter = {
    first,
    skip,
    orderBy,
    orderDirection,
  };

  if (search) {
    filters.text = `'${search.trim()}'`;
  }

  if (active) {
    filters.endDate_gt = currentTimestamp;
    filters.endDate_lt = Math.floor(Date.now() / 1000) + 10 * 365 * 24 * 60 * 60;
  } else {
    filters.endDate_gt = 0;
    filters.endDate_lt = currentTimestamp;
  }

  return filters;
};

export const useFetchHypePools = (page: number, active: boolean, searchString: string) => {
  const query = searchString ? HYPEPOOL_QUERIES.poolsSearchQuery : HYPEPOOL_QUERIES.poolsQuery;
  const computedFilters: FetchHypesFilter = computeFilters(page, active, searchString);
  const [result, reexecuteQuery] = useQuery({
    query: query,
    variables: computedFilters,
  });

  // useEffect(() => {
  //   reexecuteQuery({ requestPolicy: 'network-only' });
  // }, [reexecuteQuery, active]);

  const { data, fetching, error } = result;

  return {
    data: searchString ? (data?.poolSearch as HypePool[]) : (data?.hypePools as HypePool[]),
    fetching,
    error,
  };
};
