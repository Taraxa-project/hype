import { useToken } from 'wagmi';

export const useERC20 = (erc20Address: string) => {
  const { data } = useToken({ address: erc20Address, enabled: !!erc20Address });

  return {
    name: data.name,
    value: data.address,
  };
};
