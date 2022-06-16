import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';

export interface HypePool {
  title: string;
  description: string;
  accountAddress: string;
  pool: number;
  minReward: number;
  startDate: Date;
  endDate: Date;
}

export const useAddHypePoolEffects = () => {
  const { account } = useEthers();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    setIsConnected(account !== undefined);
  }, [account]);

  const defaultValues: HypePool = {
    title: '',
    description: '',
    accountAddress: null,
    pool: null,
    minReward: null,
    startDate: null,
    endDate: null,
  };

  const validationSchema = yup
    .object({
      title: yup.string().required('Title is required').label('Title'),
      description: yup.string().required('Message is required').label('Your message'),
      accountAddress: yup
        .string()
        .typeError('Address is required and must be a wallet address!')
        .min(42)
        .max(42)
        .notOneOf(['0x0'])
        .required('Address is required')
        .label('Address'),
      pool: yup
        .number()
        .typeError('Pool cap is required')
        .required('Pool cap is required')
        .label('Pool cap per hype'),
      minReward: yup
        .number()
        .typeError('Min reward is required')
        .required('Min reward is required')
        .label('Min reward per hype'),
      startDate: yup
        .string()
        .typeError('Pool starts is required')
        .required('Pool starts is required')
        .label('Pool starts'),
      endDate: yup
        .string()
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

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: HypePool) => {
    console.log('Data: ', data);
    reset();
  };

  const onCancel = () => {
    reset();
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    onCancel,
    errors,
    isConnected,
    control,
  };
};
