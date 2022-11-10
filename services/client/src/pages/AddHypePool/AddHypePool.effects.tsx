import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ChangeEvent, useEffect, useState } from 'react';
import { AddHypePool } from '../../models';
import useAuth from '../../hooks/useAuth';
import useContractCreatePool, { WritePoolArgs } from '../../hooks/useContractCreatePool';
import { ipfsClient } from '../../constants';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { useAddHypePool } from '../../api/pools/useAddHypePools';
import { useSwitchNetwork } from '../../hooks/useSwitchNetwork';

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
  const [showToken, setShowToken] = useState<boolean>(false);
  const { changeNetwork } = useSwitchNetwork();
  // const { data, submitHandler } = useAddHypePool();
  // console.log('DATA FROM API: ', data);

  const networkOptions = [
    {
      name: 'Taraxa Network',
      value: 843,
    },
    {
      name: 'Ethereum Network',
      value: 1,
    },
  ];

  const tokensOptions = [
    {
      name: 'TARA',
      value: '0xF001937650bb4f62b57521824B2c20f5b91bEa05',
    },
    {
      name: 'ETH',
      value: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
  ];

  const defaultValues: AddHypePool = {
    title: '',
    projectName: '',
    tokenName: null,
    description: '',
    projectDescription: '',
    word: null,
    network: null,
    token: null,
    minReward: null,
    impressionReward: null,
    cap: null,
    endDate: null,
  };

  const validationSchema = yup
    .object({
      title: yup.string().required('Title is required').label('Title'),
      projectName: yup.string().required('Project name is required').label('Project name'),
      description: yup
        .string()
        .required('Description is required')
        .label('Project description')
        .max(20),
      projectDescription: yup
        .string()
        .required('Hype description is required')
        .label('Hype description')
        .max(20),
      tokenName: yup.string().optional().label('Project token name'),
      word: yup.string().required('Hype word is required').label('Hype word'),
      network: yup.string().required('Network is required').label('Rewards are on this network'),
      token: yup
        .string()
        .typeError('Address is required and must be a wallet address!')
        .min(42)
        .max(42)
        .notOneOf(['0x0'])
        .required('Address is required')
        .label('Rewards are in this token'),
      cap: yup
        .number()
        .typeError('Pool cap is required')
        .required('Pool cap is required')
        .label('Total rewards for the pool'),
      minReward: yup
        .number()
        .typeError('Min reward is required')
        .required('Min reward is required')
        .label('Minimum rewards per winner'),
      impressionReward: yup
        .number()
        .typeError('Impression reward is required')
        .required('Impression reward is required')
        .label('Reward per 1,000 impressions'),
      endDate: yup
        .date()
        .typeError('Pool ends is required')
        .required('Pool ends is required')
        .label('Max duration of the pool'),
    })
    .required();

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    control,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: AddHypePool) => {
    const url = await uploadToIpfs(data);
    // const url = 'https://hype.infura-ipfs.io/ipfs/QmTuh1p9a9qGRWZ1QgzSrHfQ84HLEQ7n41VgM2Rd3yusfm';
    // const url = 'QmTuh1p9a9qGRWZ1QgzSrHfQ84HLEQ7n41VgM2Rd3yusfm';
    console.log('URL after upload: ', url);
    createPool(data, url);
    // submitHandler(data);
    reset();
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

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onCancel = () => {
    reset();
  };

  const handleNetworkSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const network = event.target.value;
    changeNetwork(+network);
    if (+network === networkOptions[0].value) {
      setValue('token', tokensOptions[0].value, {
        shouldValidate: true,
      });
    }
    if (+network === networkOptions[1].value) {
      setValue('token', tokensOptions[1].value, {
        shouldValidate: true,
      });
    }
  };

  const handleTokenSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const token = event.target.value;
    console.log('Token changed!', token);
  };

  return {
    register,
    handleSubmit,
    onCancel,
    errors,
    control,
    authenticated,
    onSubmit,
    currentStep,
    setCurrentStep,
    networkOptions,
    handleNetworkSelect,
    tokensOptions,
    handleTokenSelect,
    getValues,
  };
};
