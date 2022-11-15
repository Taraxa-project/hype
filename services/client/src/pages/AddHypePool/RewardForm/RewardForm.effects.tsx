import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { AddHypePool } from '../../../models';
import useAuth from '../../../hooks/useAuth';
import { useSwitchNetwork } from '../../../hooks/useSwitchNetwork';
import debounce from 'lodash.debounce';
import { useNetwork, useToken } from 'wagmi';

export interface HypePoolRewardForm
  extends Pick<
    AddHypePool,
    'network' | 'token' | 'minReward' | 'impressionReward' | 'cap' | 'endDate'
  > {
  tokenAddress?: string;
  tokenName?: string;

  // Some examples:
  // SHIBA INU: 0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE
  // FoxCoin: 0xc770EEfAd204B5180dF6a14Ee197D99d808ee52d
  // ApeCoin: 0x4d224452801ACEd8B2F0aebE155379bb5D594381
  // ENS: 0xc18360217d8f7ab5e7c516566761ea12ce7f9d72
}

export const useRewardFormEffects = (defaultValues: HypePoolRewardForm) => {
  const { authenticated } = useAuth();
  const [showToken, setShowToken] = useState<boolean>(false);
  const [tokenAddress, setTokenAddress] = useState<`0x${string}`>(null);
  const { chain } = useNetwork();
  const isEthNetwork = chain?.name === 'Ethereum';
  const { data: ERC0tokenInfo } = useToken({
    address: tokenAddress,
    enabled: !!tokenAddress && isEthNetwork,
  });
  const { changeNetwork } = useSwitchNetwork();

  const networkOptions = [
    {
      name: 'Ethereum Network',
      value: 1,
    },
    {
      name: 'Taraxa Network',
      value: 841,
    },
    {
      name: 'Taraxa Devnet',
      value: 843,
    },
    {
      name: 'Taraxa Testnet',
      value: 842,
    },
  ];

  const tokensOptions = [
    {
      name: 'ETH',
      value: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    {
      name: 'TARA',
      value: '0xF001937650bb4f62b57521824B2c20f5b91bEa05',
    },
    {
      name: 'Other',
      value: 'other',
    },
  ];

  useEffect(() => {
    if (ERC0tokenInfo) {
      setValue('token', ERC0tokenInfo.address, {
        shouldValidate: true,
      });
      setValue('tokenName', ERC0tokenInfo.name);
    }
  }, [ERC0tokenInfo]);

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
      tokenAddress: yup
        .string()
        .typeError('Address is required and must be a wallet address!')
        .min(42)
        .max(42)
        .notOneOf(['0x0'])
        .label('Custom Token address'),
      tokenName: yup.string().label('Custom Token name'),
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
      setValue('tokenName', tokensOptions[0].name);
    }
    if (
      +network === networkOptions[1].value ||
      +network === networkOptions[2].value ||
      +network === networkOptions[3].value
    ) {
      setValue('token', tokensOptions[1].value, {
        shouldValidate: true,
      });
      setValue('tokenName', tokensOptions[1].name);
    }
  };

  const handleTokenSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const token = event.target.value;
    setValue('tokenAddress', null);
    setValue('tokenName', null);
    if (token === tokensOptions[2].value) {
      setShowToken(true);
    } else {
      const currentTokenInfo = tokensOptions.find((option) => option.value === token);
      setValue('tokenAddress', currentTokenInfo?.value);
      setValue('tokenName', currentTokenInfo?.name);
      // Should add the values back to tokenAddress and tokenName?
      setShowToken(false);
    }
  };

  const handleTokenAddressInput = (event: ChangeEvent<HTMLInputElement>) => {
    const tokenAddress = event.target.value?.trim();
    if (tokenAddress && tokenAddress.length === 42) {
      setTokenAddress(tokenAddress as `0x${string}`);
    }
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleTokenAddressInput, 300);
  }, []);

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
  };
};
