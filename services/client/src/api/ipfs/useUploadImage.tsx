import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { NotificationType } from '../../utils';
import { API } from '../../constants';
import { ApiError } from '../../models';

const uploadImage = async (file: File) => {
  const url = `${API}/ipfs/upload-image`;
  let formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const useIpfsImageUpload = () => {
  const queryClient = useQueryClient();
  const dispatchModals = useModalsDispatch();

  const { mutateAsync, isLoading } = useMutation(uploadImage);

  const submitHandler = async (file: File) => {
    try {
      const uploadedImageData = await mutateAsync(file);
      queryClient.resetQueries();
      dispatchModals({
        type: ModalsActionsEnum.SHOW_LOADING,
        payload: {
          open: false,
          title: null,
          text: null,
        },
      });
      return uploadedImageData;
    } catch (error) {
      const errorData = error as AxiosError;
      const errorMessage = errorData?.response?.data as ApiError;
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
          message: [errorMessage?.message || 'Something went wrong'],
        },
      });
      throw error;
    }
  };

  return {
    submitHandler,
    isLoading,
  };
};
