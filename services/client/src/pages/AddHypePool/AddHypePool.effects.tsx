import { useState } from 'react';
import { AddHypePool } from '../../models';
import useAuth from '../../hooks/useAuth';
import useContractCreatePool, { WritePoolArgs } from '../../hooks/useContractCreatePool';
import { ipfsClient } from '../../constants';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { HypePoolDetailsForm } from './DetailsForm';
import { HypePoolRewardForm } from './RewardForm';
// import { useAddHypePool } from '../../api/pools/useAddHypePools';

export const useAddHypePoolEffects = () => {
  const defaultContractArgs: WritePoolArgs = {
    uri: null,
    projectName: null,
    title: null,
    description: null,
    poolCap: null,
    tokenAddress: null,
    minHypeReward: null,
    endDate: null,
  };
  const { authenticated } = useAuth();
  const resetWriteContract = (): void => {
    setWritePoolArgs(defaultContractArgs);
    setContractEnabled(false);
  };
  const [writePoolArgs, setWritePoolArgs] = useState<WritePoolArgs>(defaultContractArgs);
  const [contractEnabled, setContractEnabled] = useState<boolean>(false);
  useContractCreatePool(writePoolArgs, contractEnabled, resetWriteContract);
  const dispatchModals = useModalsDispatch();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [poolDetails, setPoolDetails] = useState<HypePoolDetailsForm>({
    title: 'Dragon Ball',
    projectName: 'Dragon Ball Super, Dragon Ball, DBS',
    tokenName: 'DBS',
    description: 'Dragon Ball super NFT marketplace',
    projectDescription: 'Something nice about DBS',
    word: 'testnet',
  });
  const [poolReward, setPoolReward] = useState<HypePoolRewardForm>({
    network: '',
    token: null,
    minReward: null,
    impressionReward: null,
    cap: null,
    endDate: null,
  });

  // const { data, submitHandler } = useAddHypePool();

  const onFinalize = async (data: AddHypePool) => {
    const url = await uploadToIpfs(data);
    // const url = 'https://hype.infura-ipfs.io/ipfs/QmTuh1p9a9qGRWZ1QgzSrHfQ84HLEQ7n41VgM2Rd3yusfm';
    // const url = 'QmTuh1p9a9qGRWZ1QgzSrHfQ84HLEQ7n41VgM2Rd3yusfm';
    console.log('URL after upload: ', url);
    createPool(data, url);
    // submitHandler(data);
    // reset();
  };

  const uploadToIpfs = async (data: AddHypePool) => {
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
      const uploaded = await ipfsClient.add(JSON.stringify({ description: data?.description }));
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

  const createPool = (data: AddHypePool, ipfsFileUrl: string) => {
    if (!data || !ipfsFileUrl) {
      return;
    }
    const poolCap = data.cap;
    const projectName = data.projectName;
    const description = data.description;
    const title = data.title;
    const tokenAddress = data.token;
    const minHypeReward = data.minReward;
    const endDate = data.endDate?.getTime();
    setWritePoolArgs({
      uri: ipfsFileUrl,
      projectName: projectName,
      title: title,
      description: description,
      poolCap: poolCap,
      tokenAddress: tokenAddress,
      minHypeReward: minHypeReward,
      endDate: endDate,
    });
    setContractEnabled(true);
  };

  const onSubmitDetails = (data: HypePoolDetailsForm) => {
    setCurrentStep(2);
    console.log('HypePoolDetailsForm: ', data);
    setPoolDetails(data);
  };

  const onSubmitRewards = (data: HypePoolRewardForm) => {
    setCurrentStep(3);
    console.log('HypePoolRewardForm: ', data);
    setPoolReward(data);
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
  };
};
