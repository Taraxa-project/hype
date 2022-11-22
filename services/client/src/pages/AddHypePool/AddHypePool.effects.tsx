import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useContractCreatePool, { WritePoolArgs } from '../../hooks/useContractCreatePool';
import { ipfsClient } from '../../constants';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { HypePoolDetailsForm } from './DetailsForm';
import { HypePoolRewardForm } from './RewardForm';
import { BigNumber } from 'ethers';

export const useAddHypePoolEffects = () => {
  const defaultContractArgs: WritePoolArgs = {
    uri: null,
    details: null,
    rewards: null,
  };
  const { authenticated } = useAuth();
  const resetWriteContract = (): void => {
    setWritePoolArgs(defaultContractArgs);
    setContractEnabled(false);
  };
  const successCallback = (): void => {
    setCurrentStep(3);
  };
  const [writePoolArgs, setWritePoolArgs] = useState<WritePoolArgs>(defaultContractArgs);
  const [contractEnabled, setContractEnabled] = useState<boolean>(false);
  const [createdPoolIndex, setCreatedPoolIndex] = useState<BigNumber>();
  useContractCreatePool(
    writePoolArgs,
    contractEnabled,
    resetWriteContract,
    successCallback,
    setCreatedPoolIndex,
  );
  const dispatchModals = useModalsDispatch();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [ipfsUrl, setIpfsUrl] = useState<string>('QmQSQNCF2wR9DmEnhELEtu9hoBspYxcvEZN5V9BaCMWRrg');
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
    // network: '',
    // token: null,
    // tokenAddress: '',
    // tokenName: '',
    // minReward: null,
    // impressionReward: null,
    // cap: null,
    // endDate: null
    network: 843,
    token: '0xF001937650bb4f62b57521824B2c20f5b91bEa05',
    tokenAddress: '0xF001937650bb4f62b57521824B2c20f5b91bEa05',
    tokenName: 'TARA',
    minReward: 10,
    impressionReward: 20,
    cap: 100,
    endDate: new Date('12-01-2022'),
  });

  useEffect(() => {
    if (createdPoolIndex) {
      console.log('createdPoolIndex: ', createdPoolIndex);
      console.log('formmatedPoolIndex: ', createdPoolIndex.toString());
    }
  }, [createdPoolIndex]);

  const onUploadToIpfs = async (data: HypePoolDetailsForm) => {
    const url = await uploadToIpfs(data);
    // const url = 'https://hype.infura-ipfs.io/ipfs/QmTuh1p9a9qGRWZ1QgzSrHfQ84HLEQ7n41VgM2Rd3yusfm';
    // const url = 'QmTuh1p9a9qGRWZ1QgzSrHfQ84HLEQ7n41VgM2Rd3yusfm';
    console.log('URL after upload: ', url);
    setIpfsUrl(url);
    if (url) {
      setCurrentStep(2);
    }
  };

  const fundAndActivate = () => {
    console.log('Fund & Activate');
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
      console.log('uploaded: ', uploaded);
      console.log('url: ', url);
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

  const onFinalize = () => {
    console.log('Finalize');
    console.log('Details: ', poolDetails);
    console.log('Rewards: ', poolReward);
  };

  const createPool = (details: HypePoolDetailsForm, rewards: HypePoolRewardForm) => {
    if (!details || !rewards || !ipfsUrl) {
      return;
    }
    setWritePoolArgs({
      uri: ipfsUrl,
      details,
      rewards: {
        ...rewards,
        tokenAddress:
          rewards.tokenName && rewards.tokenAddress ? rewards.tokenAddress : rewards.token,
        endDate: rewards.endDate?.getTime(),
      },
    });
    setContractEnabled(true);
  };

  const onSubmitDetails = async (data: HypePoolDetailsForm) => {
    console.log('HypePoolDetailsForm: ', data);
    setPoolDetails(data);
    // await onUploadToIpfs(data);
    setCurrentStep(2);
  };

  const onSubmitRewards = (data: HypePoolRewardForm) => {
    console.log('HypePoolRewardForm: ', data);
    setPoolReward(data);
    // createPool(poolDetails, data);
    setCurrentStep(3);
  };

  const onBackFromRewards = () => {
    setCurrentStep(1);
  };

  return {
    authenticated,
    onFinalize,
    currentStep,
    setCurrentStep,
    onSubmitDetails,
    onSubmitRewards,
    onBackFromRewards,
    poolDetails,
    poolReward,
    fundAndActivate,
  };
};
