import { Chain } from 'wagmi';

export const chainIdTr = {
  taraxaMainnet: 841,
  taraxaTestnet: 842,
  taraxaDevnet: 843,
  taraxaPrnet: 200,
} as const;
export type TaraxaChainName = keyof typeof chainIdTr;

const taraxaChainPrNet: Chain = {
  id: chainIdTr.taraxaPrnet,
  name: 'Taraxa PR Net',
  network: 'prnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Taraxa Coin',
    symbol: 'TARA',
  },
  rpcUrls: {
    default: 'https://rpc-pr-1926.prnet.taraxa.io',
    public: '	https://rpc-pr-1926.prnet.taraxa.io',
  },
  blockExplorers: {
    default: { name: 'Taraxa Pr Net Explorer', url: 'https://explorer-pr-1926.prnet.taraxa.io' },
  },
  testnet: true,
};

const taraxaChainDev: Chain = {
  id: chainIdTr.taraxaDevnet,
  name: 'Taraxa Devnet',
  network: 'devnet',
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
  network: 'testnet',
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
  network: 'mainnet',
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

export const taraxaChains = [taraxaChainDev, taraxaChainTest, taraxaChainMain, taraxaChainPrNet];
