import { useQuery } from 'urql';
import { HYPEPOOL_QUERIES } from './query-collector';

export const useGetPoolDetails = async (id: number) => {
  const [result] = useQuery({
    query: HYPEPOOL_QUERIES.poolQuery,
    variables: { id },
  });
  return result;
};
