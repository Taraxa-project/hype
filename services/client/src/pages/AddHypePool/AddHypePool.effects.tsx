import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { AddHypePool } from '../../models';
import useAuth from '../../hooks/useAuth';
import useContractCreatePool, { WritePoolArgs } from '../../hooks/useContractCreatePool';
import { ipfsClient } from '../../constants';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';

export const useAddHypePoolEffects = () => {
  const defaultContractArgs: WritePoolArgs = {
    uri: null,
    projectName: null,
    title: null,
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

  const defaultValues: AddHypePool = {
    projectName: '',
    title: '',
    description: '',
    token: null,
    cap: null,
    minReward: null,
    endDate: null,
  };

  const validationSchema = yup
    .object({
      projectName: yup.string().required('Project Name is required').label('Project Name'),
      title: yup.string().required('Title is required').label('Title'),
      description: yup.string().required('Message is required').label('Your message'),
      token: yup
        .string()
        .typeError('Address is required and must be a wallet address!')
        .min(42)
        .max(42)
        .notOneOf(['0x0'])
        .required('Address is required')
        .label('Address'),
      cap: yup
        .number()
        .typeError('Pool cap is required')
        .required('Pool cap is required')
        .label('Pool cap per hype'),
      minReward: yup
        .number()
        .typeError('Min reward is required')
        .required('Min reward is required')
        .label('Min reward per hype'),
      endDate: yup
        .date()
        .typeError('Pool ends is required')
        .required('Pool ends is required')
        .label('Pool ends'),
    })
    .required();

  const {
    handleSubmit,
    register,
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
        text: 'Uploading description to IPFS',
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
    const title = data.title;
    const tokenAddress = data.token;
    const minHypeReward = data.minReward;
    const endDate = data.endDate?.getTime();
    setWritePoolArgs({
      uri: ipfsFileUrl,
      projectName: projectName,
      title: title,
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

  return {
    register,
    handleSubmit,
    onCancel,
    errors,
    control,
    authenticated,
    onSubmit,
  };
};
