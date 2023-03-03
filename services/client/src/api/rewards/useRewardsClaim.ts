import axios from 'axios';
import { useMutation } from 'react-query';
import { API } from '../types';

const claimReward = (claimId: number) => {
  if (!claimId) {
    return;
  }
  const url = `${API}/rewards/claim?claimId=${claimId}`;
  return axios.post(url);
};

export const useRewardsClaim = () => {
  const { mutate, data, isLoading } = useMutation(({ claimId }: { claimId: number }) =>
    claimReward(claimId),
  );

  const submitHandler = (claimId: number) => {
    const requestObject: { claimId: number } = { claimId };
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
