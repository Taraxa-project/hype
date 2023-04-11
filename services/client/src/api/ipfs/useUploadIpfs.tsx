import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { HypeProjectDetails } from '../../models';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { NotificationType } from '../../utils';
import { API } from '../../constants';

const upload = (details: HypeProjectDetails) => {
  const url = `${API}/ipfs/upload`;
  return axios.post(url, details);
};

export const useIpfsUpload = () => {
  const queryClient = useQueryClient();
  const dispatchModals = useModalsDispatch();

  const { data, error, isError, isIdle, isLoading, isPaused, isSuccess, mutate } = useMutation(
    (values: HypeProjectDetails) => upload(values),
  );

  const submitHandler = (values: HypeProjectDetails) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.resetQueries();
        dispatchModals({
          type: ModalsActionsEnum.SHOW_LOADING,
          payload: {
            open: false,
            title: null,
            text: null,
          },
        });
      },
      onError: (error: any) => {
        dispatchModals({
          type: ModalsActionsEnum.SHOW_LOADING,
          payload: {
            open: false,
            title: null,
            text: null,
          },
        });
        dispatchModals({
          type: ModalsActionsEnum.SHOW_NOTIFICATION,
          payload: {
            open: true,
            type: NotificationType.ERROR,
            message: error || error?.message,
          },
        });
      },
    });
  };
  return { data, error, isError, isIdle, isLoading, isPaused, isSuccess, submitHandler };
};
