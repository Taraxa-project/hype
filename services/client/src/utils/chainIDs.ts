import { Chain } from 'wagmi';

export const chainIdTr = {
  taraxaMainnet: 1,
  taraxaTestnet: 2,
  taraxaDevnet: 3,
} as const;
export type TaraxaChainName = keyof typeof chainIdTr;

const taraxaChainDev: Chain = {
  id: chainIdTr.taraxaDevnet,
  name: 'Taraxa Devnet',
  network: 'taraxa-devnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Taraxa Coin',
    symbol: 'TARA',
  },
  rpcUrls: {
    default: 'https://rpc.devnet.taraxa.io',
    public: 'https://rpc.devnet.taraxa.io',
  },
  blockExplorers: {
    default: { name: 'Taraxa Devnet Explorer', url: 'https://explorer.devnet.taraxa.io' },
  },
  testnet: true,
};

const taraxaChainTest: Chain = {
  id: chainIdTr.taraxaTestnet,
  name: 'Taraxa Testnet',
  network: 'taraxa-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Taraxa Coin',
    symbol: 'TARA',
  },
  rpcUrls: {
    default: 'https://rpc.testnet.taraxa.io',
    public: 'https://rpc.testnet.taraxa.io',
  },
  blockExplorers: {
    default: { name: 'Taraxa Testnet Explorer', url: 'https://explorer.testnet.taraxa.io' },
  },
  testnet: true,
};

const taraxaChainMain: Chain = {
  id: chainIdTr.taraxaMainnet,
  name: 'Taraxa Mainnet',
  network: 'taraxa-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Taraxa Coin',
    symbol: 'TARA',
  },
  rpcUrls: {
    default: 'https://rpc.mainnet.taraxa.io',
    public: 'https://rpc.mainnet.taraxa.io',
  },
  blockExplorers: {
    default: { name: 'Taraxa Mainnet Explorer', url: 'https://explorer.mainnet.taraxa.io' },
  },
};

export const taraxaChains = [taraxaChainDev, taraxaChainTest, taraxaChainMain];
