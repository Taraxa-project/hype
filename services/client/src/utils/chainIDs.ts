import { Chain } from 'wagmi';

const taraxaChainDev: Chain = {
  id: 3,
  name: 'Taraxa Devnet',
  network: 'devnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Taraxa Coin',
    symbol: 'TARA',
  },
  rpcUrls: {
    default: 'https://rpc.devnet.taraxa.io',
  },
  blockExplorers: {
    default: { name: 'Taraxa Devnet Explorer', url: 'https://explorer.devnet.taraxa.io' },
  },
  testnet: true,
};

const taraxaChainTest: Chain = {
  id: 2,
  name: 'Taraxa Testnet',
  network: 'testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Taraxa Coin',
    symbol: 'TARA',
  },
  rpcUrls: {
    default: 'https://rpc.testnet.taraxa.io',
  },
  blockExplorers: {
    default: { name: 'Taraxa Testnet Explorer', url: 'https://explorer.testnet.taraxa.io' },
  },
  testnet: true,
};

const taraxaChainMain: Chain = {
  id: 1,
  name: 'Taraxa Mainnet',
  network: 'mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Taraxa Coin',
    symbol: 'TARA',
  },
  rpcUrls: {
    default: 'https://rpc.mainnet.taraxa.io',
  },
  blockExplorers: {
    default: { name: 'Taraxa Mainnet Explorer', url: 'https://explorer.mainnet.taraxa.io' },
  },
  testnet: false,
};

export const taraxaChains = [taraxaChainDev, taraxaChainTest, taraxaChainMain];
