import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { API } from '../../constants';

const requestRewardHash = (poolId: string) => {
  if (!poolId) {
    return;
  }
  const url = `${API}/rewards?poolId=${poolId}`;
  return axios.patch(url);
};

export const useRequestRewards = () => {
  const queryClient = useQueryClient();
  const { mutate, data, isLoading } = useMutation(({ poolId }: { poolId: string }) =>
    requestRewardHash(poolId),
  );

  const submitHandler = ({ poolId }: { poolId: string }) => {
    const requestObject: { poolId: string } = { poolId };
    mutate(requestObject, {
      onSuccess: () => {
        queryClient.resetQueries();
        queryClient.invalidateQueries(['user-rewards']);
      },
      onError: (error: any) => {
        console.log('Error: ', error);
      },
    });
  };
  return { submitHandler, data, isLoading };
};
