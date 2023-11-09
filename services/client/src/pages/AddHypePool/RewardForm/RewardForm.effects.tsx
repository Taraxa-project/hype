import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { AddHypePool } from '../../../models';
import { useSwitchNetwork, useAuth } from '../../../hooks';
import debounce from 'lodash.debounce';
import { useNetwork, useToken } from 'wagmi';
import { AddressType, networkOptions, tokensOptions } from '../../../utils';
import { useFieldArray } from 'react-hook-form';

export interface HypePoolRewardForm
  extends Pick<
    AddHypePool,
    'network' | 'token' | 'impressionReward' | 'cap' | 'endDate' | 'startDate' | 'duration'
  > {
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: number;
  leaderRewards: { id: number; reward: number }[];
}

export const useRewardFormEffects = (
  defaultValues: HypePoolRewardForm,
  setIsCustomToken: (val: boolean) => void,
) => {
  const { authenticated } = useAuth();
  const [showToken, setShowToken] = useState<boolean>(false);
  const [tokenAddress, setTokenAddress] = useState<AddressType>(null);
  const { chain } = useNetwork();
  const isEthNetwork = chain?.name === 'Ethereum';
  const { data: ERC20tokenInfo } = useToken({
    address: tokenAddress,
    enabled: !!tokenAddress && isEthNetwork,
  });
  const { changeNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (ERC20tokenInfo) {
      setValue('tokenAddress', ERC20tokenInfo.address || '', {
        shouldValidate: true,
      });
      setValue('tokenSymbol', ERC20tokenInfo.symbol || '', {
        shouldValidate: true,
      });
      setValue('tokenDecimals', ERC20tokenInfo.decimals || 18, {
        shouldValidate: true,
      });
      setIsCustomToken(true);
    } else {
      setIsCustomToken(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ERC20tokenInfo]);

  const validationSchema = yup
    .object({
      network: yup.string().required('Network is required').label('Rewards are on this network'),
      token: yup
        .string()
        .typeError('Address is required and must be a wallet address!')
        .required('Address is required')
        .label('Rewards are in this token'),
      tokenAddress: yup
        .string()
        .typeError('Address is required and must be a wallet address!')
        .min(42)
        .max(42)
        .notOneOf(['0x0'])
        .label('Custom Token address'),
      tokenSymbol: yup
        .string()
        .required('Custom token name is required!')
        .label('Custom Token name'),
      tokenDecimals: yup.number().required(),
      cap: yup
        .number()
        .typeError('Pool cap is required')
        .required('Pool cap is required')
        .label('Total rewards for the pool'),
      impressionReward: yup
        .number()
        .typeError('Reward / impression is required')
        .required('Reward / impression is required')
        .label('Reward per 1,000 impressions'),
      duration: yup
        .number()
        .typeError('Pool duration is required')
        .min(0)
        .required('Pool duration is required')
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
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control, // control prop from useForm
    name: 'leaderRewards',
  });

  const onCancel = () => {
    reset();
  };

  const handleNetworkSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const network = event.target.value;
    changeNetwork(+network);
    if (+network === networkOptions[0].value) {
      setValue('token', tokensOptions[0].name, {
        shouldValidate: true,
      });
      setValue('tokenAddress', tokensOptions[0].value);
      setValue('tokenSymbol', tokensOptions[0].name);
      setValue('tokenDecimals', tokensOptions[0].decimals);
    }
    if (
      +network === networkOptions[1].value ||
      +network === networkOptions[2].value ||
      +network === networkOptions[3].value
    ) {
      setValue('token', tokensOptions[1].name, {
        shouldValidate: true,
      });
      setValue('tokenAddress', tokensOptions[1].value);
      setValue('tokenSymbol', tokensOptions[1].name);
      setValue('tokenDecimals', tokensOptions[1].decimals);
    }
  };

  const handleTokenSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const token = event.target.value;
    setValue('tokenAddress', '');
    setValue('tokenSymbol', '');
    if (token === tokensOptions[2].name) {
      setShowToken(true);
    } else {
      const currentTokenInfo = tokensOptions.find((option) => option.name === token);
      setValue('tokenAddress', currentTokenInfo?.value);
      setValue('tokenSymbol', currentTokenInfo?.name);
      setValue('tokenDecimals', currentTokenInfo?.decimals);
      setShowToken(false);
      setIsCustomToken(false);
    }
  };

  const debouncedResults = useMemo(() => {
    const handleTokenAddressInput = (event: ChangeEvent<HTMLInputElement>) => {
      setValue('tokenSymbol', '');
      const tokenAddress = event.target.value?.trim();
      if (tokenAddress && tokenAddress.length === 42) {
        setTokenAddress(tokenAddress as AddressType);
      }
    };
    return debounce(handleTokenAddressInput, 300);
  }, [setValue]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

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
    showToken,
    debouncedResults,
    isEthNetwork,
    fields,
    append,
    remove,
  };
};
