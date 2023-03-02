import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { AddHypePool } from '../../../models';
import { useSwitchNetwork, useAuth } from '../../../hooks';
import debounce from 'lodash.debounce';
import { useNetwork, useToken } from 'wagmi';
import { AddressType, networkOptions, tokensOptions } from '../../../utils';

export interface HypePoolRewardForm
  extends Pick<
    AddHypePool,
    'network' | 'token' | 'impressionReward' | 'cap' | 'endDate' | 'startDate' | 'duration'
  > {
  tokenAddress: string;
  tokenName: string;
  tokenDecimals: number;

  // Some examples of custom ERC20 Tokens:
  // SHIBA INU: 0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE
  // FoxCoin: 0xc770EEfAd204B5180dF6a14Ee197D99d808ee52d
  // ApeCoin: 0x4d224452801ACEd8B2F0aebE155379bb5D594381
  // ENS: 0xc18360217d8f7ab5e7c516566761ea12ce7f9d72
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
      setValue('tokenName', ERC20tokenInfo.name || '', {
        shouldValidate: true,
      });
      setValue('tokenDecimals', ERC20tokenInfo.decimals || 18, {
        shouldValidate: true,
      });
      setIsCustomToken(true);
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
      tokenName: yup.string().required('Custom token name is required!').label('Custom Token name'),
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
        .max(30)
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
      setValue('tokenName', tokensOptions[0].name);
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
      setValue('tokenName', tokensOptions[1].name);
      setValue('tokenDecimals', tokensOptions[1].decimals);
    }
  };

  const handleTokenSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const token = event.target.value;
    setValue('tokenAddress', '');
    setValue('tokenName', '');
    if (token === tokensOptions[2].name) {
      setShowToken(true);
    } else {
      const currentTokenInfo = tokensOptions.find((option) => option.name === token);
      setValue('tokenAddress', currentTokenInfo?.value);
      setValue('tokenName', currentTokenInfo?.name);
      setValue('tokenDecimals', currentTokenInfo?.decimals);
      setShowToken(false);
      setIsCustomToken(false);
    }
  };

  const handleTokenAddressInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue('tokenName', '');
    const tokenAddress = event.target.value?.trim();
    if (tokenAddress && tokenAddress.length === 42) {
      setTokenAddress(tokenAddress as AddressType);
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
