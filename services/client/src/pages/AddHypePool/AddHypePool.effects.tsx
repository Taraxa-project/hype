import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { AddHypePool } from '../../models';
import { useAddHypePool } from '../../api/pools/useAddHypePool';
import useAuth from '../../hooks/useAuth';
import useContractCreatePool from '../../hooks/useContractCreatePool';

export const useAddHypePoolEffects = () => {
  const { authenticated } = useAuth();
  const { data: createdPoolUri, submitHandler } = useAddHypePool();
  const { write: mintPool } = useContractCreatePool();

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

  const [createdPool, setCreatedPool] = useState<AddHypePool>(defaultValues);

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

  const onSubmit = async (data: AddHypePool) => {
    submitHandler(data);
    setCreatedPool(data);
    reset();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onCancel = () => {
    reset();
  };

  useEffect(() => {
    if (createdPoolUri && createdPool) {
      // Get the form data
      // Create the pool model and add the URI
      // Pass it as args to write function

      // string memory uri,
      // uint256 poolCap,
      // address tokenAddress,
      // uint256 minHypeReward,
      // uint256 endDate

      const poolToMint = {
        uri: createdPoolUri,
        poolCap: createdPool.pool,
        tokenAddress: createdPool.rewardsAddress,
        minHypeReward: createdPool.minReward,
        endDate: createdPool.endDate,
      };
      mintPool({ args: poolToMint });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdPoolUri, createdPool]);

  return {
    register,
    handleSubmit,
    onCancel,
    errors,
    control,
    submitHandler,
    authenticated,
    onSubmit,
  };
};
