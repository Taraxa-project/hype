import { useEffect, useRef, useState } from 'react';
import { useContractCreatePool, WritePoolArgs } from '../../hooks/useContractCreatePool';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { HypePoolDetailsForm } from './DetailsForm';
import { HypePoolRewardForm } from './RewardForm';
import { ethers } from 'ethers';
import { useIpfsUpload } from '../../api/ipfs/useUploadIpfs';
import { HypeProjectDetails } from '../../models';
import { HypeImageUploadRef } from './DetailsForm/HypeImageUpload';

export const useAddHypePoolEffects = () => {
  const dispatchModals = useModalsDispatch();
  const imageUploadRef = useRef<HypeImageUploadRef>(null);

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
  const [writePoolArgs, setWritePoolArgs] = useState<WritePoolArgs>(defaultContractArgs);
  const [contractEnabled, setContractEnabled] = useState<boolean>(false);
  const [createdPoolIndex, setCreatedPoolIndex] = useState<string>();
  const [currentStep, setCurrentStep] = useState<number>(2);
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

  useContractCreatePool(
    writePoolArgs,
    contractEnabled,
    resetWriteContract,
    successCallback,
    setCreatedPoolIndex,
    setPoolTransaction,
  );

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
    const leaderRewards = [];
    if (rewards.leaderRewards?.length > 0) {
      rewards.leaderRewards.map((reward: { id: number; reward: number }) => {
        let formattedReward = ethers.utils.parseUnits(
          reward.toString().replace(',', '.'),
          rewards.tokenDecimals,
        );
        leaderRewards.push(formattedReward);
      });
    }
    setWritePoolArgs({
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
    });
    setContractEnabled(true);
    setPoolReward(rewards);
  };

  const onSubmitDetails = async (data: HypePoolDetailsForm) => {
    setPoolDetails(data);
    await onUploadToIpfs(data);
  };

  const onSubmitRewards = (data: HypePoolRewardForm) => {
    console.log('REWARDS SUBMITTED: ', data);
    // createPool(poolDetails, data);
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
