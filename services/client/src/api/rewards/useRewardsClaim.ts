import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { API } from '../../constants';
import { ApiError } from '../../models';

export interface ClaimReward {
  id: number;
  poolId: string;
}

const claimReward = (claim: ClaimReward) => {
  if (!claim) {
    return;
  }
  const url = `${API}/rewards/claim`;
  return axios.post(url, claim);
};

export const useRewardsClaim = () => {
  const queryClient = useQueryClient();
  const { mutate, data, isLoading } = useMutation((claim: ClaimReward) => claimReward(claim));

  const submitHandler = (claim: ClaimReward) => {
    const requestObject: ClaimReward = claim;
    mutate(requestObject, {
      onSuccess: () => {
        queryClient.resetQueries();
        queryClient.invalidateQueries(['user-rewards']);
      },
      onError: (error: any) => {
        console.log('Error: ', error);
        const errorData = error as AxiosError;
        const errorMessage = errorData?.response?.data as ApiError;
        console.error('Error message: ', errorMessage);
      },
    });
  };
  return { submitHandler, data, isLoading };
};
