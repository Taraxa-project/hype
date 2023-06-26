import { Dispatch, useState } from 'react';
import Text from '../../../components/styles/Text';
import Box from '../../../components/styles/Box';
import { UploadControl } from '../../../components/upload/Upload';
import LoadingSpinner from '../../../assets/icons/Spinner';
import SuccessIcon from '../../../assets/icons/Success';
import Button from '../../../components/button/Button';
import { useIpfsImageUpload } from '../../../api/ipfs/useUploadImage';
import { Example, Label, FormElement, PoolImage } from '../AddHypePool.styled';

export interface HypeImageProps {
  imageUrl: string;
  setImageUrl: Dispatch<any>;
}

export const HypeImageUpload = ({ imageUrl, setImageUrl }: HypeImageProps) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    data: uploadedImageUrl,
    submitHandler: uploadImage,
    isLoading: isUploadingImage,
  } = useIpfsImageUpload();

  const onUploadImage = async () => {
    if (selectedImage) {
      uploadImage(selectedImage);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  if (uploadedImageUrl) {
    setImageUrl(uploadedImageUrl.data.cid.toString());
  }

  return (
    <FormElement>
      <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
        <Label>Project's image: </Label>
      </Box>
      <Example>
        This is not mandatory but we recommend uploading an image that represents your project
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
          <UploadControl
            value={selectedImage}
            onChange={(event) => {
              setSelectedImage(event.target.files[0]);
            }}
            accept="image/*"
          >
            Select image
          </UploadControl>
        </Button>
      )}
      {selectedImage &&
        (!isUploadingImage ? (
          <>
            <Button
              type="button"
              variant="primary"
              onClick={() => onUploadImage()}
              disabled={!!imageUrl}
            >
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
