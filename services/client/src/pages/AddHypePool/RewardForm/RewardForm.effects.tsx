import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ChangeEvent, useEffect, useState } from 'react';
import { AddHypePool } from '../../../models';
import useAuth from '../../../hooks/useAuth';
import { useSwitchNetwork } from '../../../hooks/useSwitchNetwork';

export interface HypePoolRewardForm
  extends Pick<
    AddHypePool,
    'network' | 'token' | 'minReward' | 'impressionReward' | 'cap' | 'endDate'
  > {}

export const useRewardFormEffects = (defaultValues: HypePoolRewardForm) => {
  const { authenticated } = useAuth();
  const [showToken, setShowToken] = useState<boolean>(false);
  const { changeNetwork } = useSwitchNetwork();

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

  const validationSchema = yup
    .object({
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
    networkOptions,
    handleNetworkSelect,
    tokensOptions,
    handleTokenSelect,
    getValues,
  };
};
