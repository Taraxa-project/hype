import axios from 'axios';
import { useMutation } from 'react-query';
import { API } from '../types';

const requestRewardHash = (address: string, poolId: string) => {
  if (!address || !poolId) {
    return;
  }
  const url = `${API}/rewards/${address}?poolId=${poolId}`;
  return axios.patch(url);
};

export const useRequestRewards = () => {
  const { mutate, data, isLoading } = useMutation(
    ({ address, poolId }: { address: string; poolId: string }) =>
      requestRewardHash(address, poolId),
  );

  const submitHandler = ({ address, poolId }: { address: string; poolId: string }) => {
    const requestObject: { address: string; poolId: string } = { address, poolId };
    mutate(requestObject, {
      onSuccess: () => {
        // queryClient.resetQueries();
        // queryClient.invalidateQueries(['hype-user']);
      },
      onError: (error: any) => {
        console.log('Error: ', error);
      },
    });
  };
  return { submitHandler, data, isLoading };
};
