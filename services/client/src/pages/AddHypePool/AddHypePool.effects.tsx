import { useEffect, useState } from 'react';
import { useContractCreatePool, WritePoolArgs } from '../../hooks/useContractCreatePool';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { HypePoolDetailsForm } from './DetailsForm';
import { HypePoolRewardForm } from './RewardForm';
import { ethers } from 'ethers';
import { useIpfsUpload } from '../../api/ipfs/useUploadIpfs';
import { HypeProjectDetails } from '../../models';
import { useIpfsImageUpload } from '../../api/ipfs/useUploadImage';

export const useAddHypePoolEffects = () => {
  const dispatchModals = useModalsDispatch();

  const defaultContractArgs: WritePoolArgs = {
    uri: null,
    details: null,
    rewards: null,
  };
  const resetWriteContract = (): void => {
    setWritePoolArgs(defaultContractArgs);
    setContractEnabled(false);
  };
  const successCallback = (): void => {
    setCurrentStep(3);
  };
  const successCallbackActivatePool = (): void => {
    setCurrentStep(4);
  };

  const { data: uploadedIpfsUrl, submitHandler } = useIpfsUpload();
  const {
    data: uploadedImageUrl,
    submitHandler: uploadImage,
    isLoading: isUploadingImage,
  } = useIpfsImageUpload();
  const [selectedImage, setSelectedImage] = useState(null);
  const [writePoolArgs, setWritePoolArgs] = useState<WritePoolArgs>(defaultContractArgs);
  const [contractEnabled, setContractEnabled] = useState<boolean>(false);
  const [createdPoolIndex, setCreatedPoolIndex] = useState<string>();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [ipfsUrl, setIpfsUrl] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [isCustomToken, setIsCustomToken] = useState<boolean>(false);
  const [poolTransaction, setPoolTransaction] = useState<string>();
  const [poolDetails, setPoolDetails] = useState<HypePoolDetailsForm>({
    title: '',
    projectName: '',
    tokenName: '',
    description: '',
    projectDescription: '',
    word: 'testnet',
  });
  const [poolReward, setPoolReward] = useState<HypePoolRewardForm>({
    network: 841,
    token: null,
    tokenAddress: '',
    tokenName: '',
    tokenDecimals: 18,
    impressionReward: null,
    cap: null,
    duration: null,
    startDate: 0,
    endDate: 0,
  });

  useContractCreatePool(
    writePoolArgs,
    contractEnabled,
    resetWriteContract,
    successCallback,
    setCreatedPoolIndex,
    setPoolTransaction,
  );

  useEffect(() => {
    if (uploadedImageUrl) {
      // console.log('uploadedImageUrl: ', uploadedImageUrl.data.cid.toString());
      setImageUrl(uploadedImageUrl.data.cid.toString());
    }
  }, [uploadedImageUrl]);

  useEffect(() => {
    if (uploadedIpfsUrl) {
      setIpfsUrl(uploadedIpfsUrl.data.path);
      setCurrentStep(2);
    }
  }, [uploadedIpfsUrl]);

  const onUploadImage = async () => {
    if (selectedImage) {
      uploadImage(selectedImage);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
    console.log('image url: ', imageUrl);
  };

  const onUploadToIpfs = async (data: HypePoolDetailsForm) => {
    const projectDetails: HypeProjectDetails = {
      description: data.description,
      projectDescription: data.projectDescription,
      imageUri: imageUrl,
    };
    dispatchModals({
      type: ModalsActionsEnum.SHOW_LOADING,
      payload: {
        open: true,
        title: 'Loading',
        text: ['Uploading description to IPFS'],
      },
    });
    submitHandler(projectDetails);
  };

  const createPool = (details: HypePoolDetailsForm, rewards: HypePoolRewardForm) => {
    if (!details || !rewards || !ipfsUrl) {
      return;
    }
    const cap = ethers.utils.parseUnits(
      rewards.cap.toString().replace(',', '.'),
      rewards.tokenDecimals,
    );
    const impressionReward = ethers.utils.parseUnits(
      rewards.impressionReward.toString().replace(',', '.'),
      rewards.tokenDecimals,
    );
    setWritePoolArgs({
      uri: ipfsUrl,
      details,
      rewards: {
        ...rewards,
        cap,
        impressionReward,
        tokenAddress:
          rewards.tokenName && rewards.tokenAddress ? rewards.tokenAddress : rewards.token,
        endDate: 0,
        startDate: 0,
        duration: rewards.duration * 24 * 60 * 60,
      },
    });
    setContractEnabled(true);
    setPoolReward(rewards);
  };

  const onSubmitDetails = async (data: HypePoolDetailsForm) => {
    setPoolDetails(data);
    await onUploadToIpfs(data);
  };

  const onSubmitRewards = (data: HypePoolRewardForm) => {
    createPool(poolDetails, data);
  };

  const onBackFromRewards = () => {
    setCurrentStep(1);
  };

  return {
    currentStep,
    onSubmitDetails,
    onSubmitRewards,
    onBackFromRewards,
    poolDetails,
    poolReward,
    successCallbackActivatePool,
    createdPoolIndex,
    isCustomToken,
    setIsCustomToken,
    poolTransaction,
    onUploadImage,
    setSelectedImage,
    selectedImage,
    isUploadingImage,
    imageUrl,
    removeImage,
  };
};
