import { isProd } from '../constants';
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
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg',
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
    show: true,
  },
  {
    name: 'Taraxa Mainnet',
    value: 841,
    show: true,
  },
  {
    name: 'Taraxa Devnet',
    value: 843,
    show: !isProd,
  },
  {
    name: 'Taraxa Testnet',
    value: 842,
    show: !isProd,
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
    value: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // Not really that relevant but it needs to
    decimals: 18,
  },
];

export const getExplorerFromNetwork = (
  network: number,
  hash: string,
): {
  text: string;
  href: string;
} => {
  switch (network) {
    case networkOptions[0].value:
      return {
        text: ` Etherscan 🌐.`,
        href: `https://etherscan.io/tx/${hash}`,
      };
    case networkOptions[1].value:
      return {
        text: `  Taraxa Network Explorer 🌐.`,
        href: `https://mainnet.explorer.taraxa.io/tx/${hash}`,
      };

    case networkOptions[2].value:
      return {
        text: `  Taraxa Network Explorer 🌐.`,
        href: `https://devnet.explorer.taraxa.io/tx/${hash}`,
      };
    case networkOptions[3].value:
      return {
        text: `  Taraxa Network Explorer 🌐.`,
        href: `https://testnet.explorer.taraxa.io/tx/${hash}`,
      };
    default:
      return {
        text: `  Taraxa Network Explorer 🌐.`,
        href: `https://mainnet.explorer.taraxa.io/tx/${hash}`,
      };
  }
};
