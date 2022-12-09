import { useState } from 'react';
import { useContractCreatePool, WritePoolArgs } from '../../hooks/useContractCreatePool';
import { ipfsClient } from '../../constants';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { HypePoolDetailsForm } from './DetailsForm';
import { HypePoolRewardForm } from './RewardForm';
import { BigNumber } from 'ethers';

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

  const [writePoolArgs, setWritePoolArgs] = useState<WritePoolArgs>(defaultContractArgs);
  const [contractEnabled, setContractEnabled] = useState<boolean>(false);
  const [createdPoolIndex, setCreatedPoolIndex] = useState<BigNumber>(BigNumber.from(3)); //BigNumber.from(16)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [ipfsUrl, setIpfsUrl] = useState<string>();
  const [isCustomToken, setIsCustomToken] = useState<boolean>(false);
  const [poolTransaction, setPoolTransaction] = useState<string>();
  const [poolDetails, setPoolDetails] = useState<HypePoolDetailsForm>({
    // title: '',
    // projectName: '',
    // tokenName: '',
    // description: '',
    // projectDescription: '',
    // word: 'testnet',
    title: 'Dragon Ball',
    projectName: 'Dragon Ball Super, Dragon Ball, DBS',
    tokenName: 'DBS',
    description: 'Dragon Ball super NFT marketplace',
    projectDescription: 'Something nice about DBS',
    word: 'testnet',
  });
  const [poolReward, setPoolReward] = useState<HypePoolRewardForm>({
    // network: 843,
    // token: null,
    // tokenAddress: '',
    // tokenName: '',
    // tokenDecimals: 18,
    // impressionReward: null,
    // cap: null,
    // endDate: null,
    network: 843,
    token: 'TARA',
    tokenAddress: '0x0000000000000000000000000000000000000000',
    tokenName: 'TARA',
    tokenDecimals: 18,
    impressionReward: 2,
    cap: 10,
    endDate: new Date('12-02-2023'),
  });

  useContractCreatePool(
    writePoolArgs,
    contractEnabled,
    resetWriteContract,
    successCallback,
    setCreatedPoolIndex,
    setPoolTransaction,
  );

  const onUploadToIpfs = async (data: HypePoolDetailsForm) => {
    const url = await uploadToIpfs(data);
    setIpfsUrl(url);
    if (url) {
      setCurrentStep(2);
    }
  };

  const uploadToIpfs = async (data: HypePoolDetailsForm) => {
    if (!data) {
      return;
    }
    dispatchModals({
      type: ModalsActionsEnum.SHOW_LOADING,
      payload: {
        open: true,
        title: 'Loading',
        text: ['Uploading description to IPFS'],
      },
    });
    let url: string;
    try {
      const uploaded = await ipfsClient.add(
        JSON.stringify({
          description: data?.description,
          projectDescription: data?.projectDescription,
        }),
      );
      url = uploaded.path;
      // console.log('url: ', url);
      // console.log('uploaded: ', uploaded);
    } catch (error) {
      console.log('Error uploading to IPFS: ', error);
    } finally {
      dispatchModals({
        type: ModalsActionsEnum.SHOW_LOADING,
        payload: {
          open: false,
          title: null,
          text: null,
        },
      });
      return url;
    }
  };

  const createPool = (details: HypePoolDetailsForm, rewards: HypePoolRewardForm) => {
    if (!details || !rewards || !ipfsUrl) {
      return;
    }
    const cap = BigNumber.from(rewards.cap).mul(BigNumber.from(10).pow(rewards.tokenDecimals));
    const impressionReward = BigNumber.from(rewards.impressionReward).mul(
      BigNumber.from(10).pow(rewards.tokenDecimals),
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
        endDate: rewards.endDate?.getTime(),
      },
    });
    setContractEnabled(true);
    setPoolReward(rewards);
  };

  const onSubmitDetails = async (data: HypePoolDetailsForm) => {
    setPoolDetails(data);
    await onUploadToIpfs(data);
    // setCurrentStep(2);
  };

  const onSubmitRewards = (data: HypePoolRewardForm) => {
    createPool(poolDetails, data);
    // setCurrentStep(3);
    // setPoolReward(data);
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
  };
};
