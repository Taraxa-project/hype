import { ethToken, taraToken, zeroAddress } from './enums';

interface Network {
  chainName: string;
  rpcUrl: string;
  iconUrl: string;
  blockExplorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}
interface Networks {
  [key: number]: Network;
}
export const networks: Networks = {
  1: {
    chainName: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/',
    iconUrl: 'https://community.taraxa.io/logo192.png',
    blockExplorerUrl: 'https://etherscan.io',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  841: {
    chainName: 'Taraxa Mainnet',
    rpcUrl: 'https://rpc.mainnet.taraxa.io/',
    iconUrl: 'https://community.taraxa.io/logo192.png',
    blockExplorerUrl: 'https://explorer.mainnet.taraxa.io/',
    nativeCurrency: {
      name: 'TARA',
      symbol: 'TARA',
      decimals: 18,
    },
  },
  842: {
    chainName: 'Taraxa Testnet',
    rpcUrl: 'https://rpc.testnet.taraxa.io/',
    iconUrl: 'https://community.taraxa.io/logo192.png',
    blockExplorerUrl: 'https://explorer.testnet.taraxa.io/',
    nativeCurrency: {
      name: 'TARA',
      symbol: 'TARA',
      decimals: 18,
    },
  },
  843: {
    chainName: 'Taraxa Devnet',
    rpcUrl: 'https://rpc.devnet.taraxa.io/',
    iconUrl: 'https://community.taraxa.io/logo192.png',
    blockExplorerUrl: 'https://explorer.devnet.taraxa.io/',
    nativeCurrency: {
      name: 'TARA',
      symbol: 'TARA',
      decimals: 18,
    },
  },
};

export const findInNetwork = (networkId: number): boolean => {
  for (const [key] of Object.entries(networks)) {
    if (Number(networkId) === Number(key)) {
      return true;
    }
  }
  return false;
};

export const networkOptions = [
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

export const tokensOptions = [
  {
    name: ethToken,
    value: zeroAddress,
    decimals: 18,
  },
  {
    name: taraToken,
    value: zeroAddress,
    decimals: 18,
  },
  {
    name: 'Other',
    value: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 18,
  },
];
