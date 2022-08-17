import { useQuery } from 'urql';
import { HYPEPOOL_QUERIES } from './query-collector';

export const useGetHypePoolsBy = async (creatorAddress: string) => {
  const [result] = useQuery({
    query: HYPEPOOL_QUERIES.profilePoolsQuery,
    variables: { creator: creatorAddress },
  });
  return result;
};
