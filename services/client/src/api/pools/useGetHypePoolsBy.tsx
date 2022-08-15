import { useQuery } from 'urql';

const profilePoolsQuery = `
  query($creator: String) {
    hypePools(
      creator: $creator
    ) {
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

export const useGetHypePoolsBy = async (creatorAddress: string) => {
  const [result] = useQuery({
    query: profilePoolsQuery,
    variables: { creator: creatorAddress },
  });
  return result;
};
