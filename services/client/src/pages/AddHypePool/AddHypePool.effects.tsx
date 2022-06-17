import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import useMetamask from '../../hooks/useMetamask';
import { AddHypePool } from '../../models';

export const useAddHypePoolEffects = () => {
  const { status } = useMetamask();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    setIsConnected(status === 'connected');
  }, [status]);

  const defaultValues: AddHypePool = {
    projectName: '',
    title: '',
    description: '',
    rewardsAddress: null,
    pool: null,
    minReward: null,
    startDate: null,
    endDate: null,
  };

  const validationSchema = yup
    .object({
      projectName: yup.string().required('Project Name is required').label('Project Name'),
      title: yup.string().required('Title is required').label('Title'),
      description: yup.string().required('Message is required').label('Your message'),
      rewardsAddress: yup
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
        .date()
        .typeError('Pool starts is required')
        .required('Pool starts is required')
        .label('Pool starts'),
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

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: AddHypePool) => {
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
