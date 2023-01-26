import { Chain } from 'wagmi';

export const chainIdTr = {
  taraxaMainnet: 841,
  taraxaTestnet: 842,
  taraxaDevnet: 843,
} as const;
export type TaraxaChainName = keyof typeof chainIdTr;

export const taraxaDevnet: Chain = {
  id: 842,
  name: 'Taraxa Devnet',
  network: 'taraxa-devnet',
  nativeCurrency: { name: 'Tara', symbol: 'TARA', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.devnet.taraxa.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Taraxa Explorer',
      url: 'https://explorer.devnet.taraxa.io',
    },
  },
  testnet: true,
};
