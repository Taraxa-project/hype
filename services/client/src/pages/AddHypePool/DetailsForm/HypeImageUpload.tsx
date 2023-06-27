import { useCallback, useEffect, useState } from 'react';
import Text from '../../../components/styles/Text';
import Box from '../../../components/styles/Box';
import { UploadControl } from '../../../components/upload/Upload';
import LoadingSpinner from '../../../assets/icons/Spinner';
import SuccessIcon from '../../../assets/icons/Success';
import Button from '../../../components/button/Button';
import { useIpfsImageUpload } from '../../../api/ipfs/useUploadImage';
import { Example, Label, FormElement, PoolImage } from '../AddHypePool.styled';
import { ModalsActionsEnum, useModalsDispatch } from '../../../context';
import { NotificationType } from '../../../utils';

export interface HypeImageUploadRef {
  hasSelectedImage: () => boolean;
  onUploadImage: () => Promise<string>;
  imageUrl: string;
}

export interface HypeImageProps {
  imageUploadRef: React.MutableRefObject<HypeImageUploadRef | null>;
}

export const HypeImageUpload = ({ imageUploadRef }: HypeImageProps) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState<string>();
  const dispatchModals = useModalsDispatch();

  const { submitHandler: uploadImage, isLoading: isUploadingImage } = useIpfsImageUpload();

  const onUploadImage = useCallback(async () => {
    if (selectedImage) {
      const uploadedImageUrl = await uploadImage(selectedImage);
      setImageUrl(uploadedImageUrl?.cid);
      return uploadedImageUrl?.cid;
    }
  }, [selectedImage, uploadImage]);

  const hasSelectedImage = useCallback((): boolean => {
    return !!selectedImage;
  }, [selectedImage]);

  const onUploadTriggered = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    // Check the file type
    const fileType = file.type;
    if (!/^image\/(jpeg|jpg|png)$/.test(fileType)) {
      dispatchModals({
        type: ModalsActionsEnum.SHOW_NOTIFICATION,
        payload: {
          open: true,
          type: NotificationType.ERROR,
          message: ['Please select a valid image file (JPEG, JPG, or PNG).'],
        },
      });
      return;
    }
    // Check the file size
    const fileSize = file.size; // in bytes
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (fileSize > maxSize) {
      dispatchModals({
        type: ModalsActionsEnum.SHOW_NOTIFICATION,
        payload: {
          open: true,
          type: NotificationType.ERROR,
          message: ['Please select an image file smaller than 2MB.'],
        },
      });
      return;
    }

    setSelectedImage(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  useEffect(() => {
    imageUploadRef.current = {
      hasSelectedImage,
      onUploadImage,
      imageUrl,
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSelectedImage, onUploadImage, imageUrl]);

  return (
    <FormElement>
      <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
        <Label>Project's image: </Label>
      </Box>
      <Example>
        This is not mandatory but we recommend uploading an image that represents your project. The
        image size should not exceed 2MB
      </Example>

      {selectedImage && (
        <Box display="flex" flexDirection="column" gridGap="0.2rem" mb={3}>
          <PoolImage alt="not found" width={'250px'} src={URL.createObjectURL(selectedImage)} />
          <Button
            size="full-width"
            disabled={isUploadingImage}
            type="button"
            variant="primary"
            onClick={removeImage}
          >
            Remove
          </Button>
        </Box>
      )}
      {!selectedImage && (
        <Button type="button" style={{ padding: 0 }} variant="primary">
          <UploadControl value={selectedImage} onChange={onUploadTriggered} accept="image/*">
            Select image
          </UploadControl>
        </Button>
      )}
      {selectedImage &&
        (!isUploadingImage ? (
          <>
            <Button type="button" variant="primary" onClick={onUploadImage} disabled={!!imageUrl}>
              {!imageUrl ? (
                'Upload image'
              ) : (
                <Box display="flex" alignItems="center">
                  <Text pr={3}>Image uploaded</Text> <SuccessIcon />
                </Box>
              )}
            </Button>
          </>
        ) : (
          <Box p={3}>
            <LoadingSpinner />
          </Box>
        ))}
    </FormElement>
  );
};
