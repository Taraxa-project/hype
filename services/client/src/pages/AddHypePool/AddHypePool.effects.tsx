import { useEffect, useRef, useState } from 'react';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { HypePoolDetailsForm } from './DetailsForm';
import { HypePoolRewardForm } from './RewardForm';
import { BigNumber, ethers } from 'ethers';
import { useIpfsUpload } from '../../api/ipfs/useUploadIpfs';
import { HypeProjectDetails } from '../../models';
import { HypeImageUploadRef } from './DetailsForm/HypeImageUpload';
import { WritePoolArgs, useHypePools } from '../../hooks';

export const useAddHypePoolEffects = () => {
  const dispatchModals = useModalsDispatch();
  const imageUploadRef = useRef<HypeImageUploadRef>(null);

  const successCallback = (): void => {
    setCurrentStep(3);
  };
  const successCallbackActivatePool = (): void => {
    setCurrentStep(4);
  };

  const { data: uploadedIpfsUrl, submitHandler } = useIpfsUpload();
  const [createdPoolIndex, setCreatedPoolIndex] = useState<string>();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [ipfsUrl, setIpfsUrl] = useState<string>();
  const [isCustomToken, setIsCustomToken] = useState<boolean>(false);
  const [poolTransaction, setPoolTransaction] = useState<string>();
  const [poolDetails, setPoolDetails] = useState<HypePoolDetailsForm>({
    title: '',
    projectName: '',
    tokenName: '',
    description: '',
    projectDescription: '',
    campaignWord: 'testnet',
  });
  const [poolReward, setPoolReward] = useState<HypePoolRewardForm>({
    network: 841,
    token: null,
    tokenAddress: '',
    tokenSymbol: '',
    tokenDecimals: 18,
    impressionReward: null,
    cap: null,
    duration: null,
    startDate: 0,
    endDate: 0,
    leaderRewards: [],
  });
  const { createPool: onPoolCreate } = useHypePools();

  useEffect(() => {
    if (uploadedIpfsUrl) {
      setIpfsUrl(uploadedIpfsUrl.data.path);
      setCurrentStep(2);
    }
  }, [uploadedIpfsUrl]);

  const onUploadToIpfs = async (data: HypePoolDetailsForm) => {
    let imageUri = imageUploadRef.current?.imageUrl;
    if (
      imageUploadRef.current &&
      imageUploadRef.current.hasSelectedImage() &&
      !imageUploadRef.current.imageUrl
    ) {
      imageUri = await imageUploadRef.current.onUploadImage();
      // dispatchModals({
      //   type: ModalsActionsEnum.SHOW_NOTIFICATION,
      //   payload: {
      //     open: true,
      //     type: NotificationType.INFO,
      //     message: [
      //       'It seems you have selected an image but forgot to upload it. You can upload the image or remove it.',
      //     ],
      //   },
      // });
      // return;
    }
    const projectDetails: HypeProjectDetails = {
      description: data.description,
      projectDescription: data.projectDescription,
      imageUri,
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
    const leaderRewards: BigNumber[] = [];
    if (rewards.leaderRewards?.length > 0) {
      rewards.leaderRewards.map((leaderReward: { id: number; reward: number }) => {
        let formattedReward = ethers.utils.parseUnits(
          leaderReward.reward.toString().replace(',', '.'),
          rewards.tokenDecimals,
        );
        leaderRewards.push(formattedReward);
      });
    }

    const args: WritePoolArgs = {
      uri: ipfsUrl,
      details,
      rewards: {
        ...rewards,
        cap,
        impressionReward,
        tokenAddress:
          rewards.tokenSymbol && rewards.tokenAddress ? rewards.tokenAddress : rewards.token,
        endDate: 0,
        startDate: 0,
        duration: rewards.duration * 24 * 60 * 60,
      },
      leaderRewards,
    };
    onPoolCreate(
      args,
      successCallback,
      setCreatedPoolIndex,
      setPoolTransaction,
    );
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
    imageUploadRef,
  };
};
