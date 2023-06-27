import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { NotificationType } from '../../utils';
import { API } from '../../constants';

const uploadImage = (file: File) => {
  const url = `${API}/ipfs/upload-image`;
  let formData = new FormData();
  formData.append('file', file);
  return axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useIpfsImageUpload = () => {
  const queryClient = useQueryClient();
  const dispatchModals = useModalsDispatch();

  const { data, error, isError, isIdle, isLoading, isPaused, isSuccess, mutate } = useMutation(
    (file: File) => uploadImage(file),
  );

  const submitHandler = (file: File) => {
    mutate(file, {
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
