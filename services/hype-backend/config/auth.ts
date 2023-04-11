import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  walletEndpoint: process.env.WALLET_HOST || 'http://localhost:3006',
  gsSecret: process.env.GS_SECRET,
  subGraphEndpoint:
    process.env.SUBGRAPH_HOST ||
    'https://indexer.qa.hype.taraxa.io/subgraphs/name/taraxa/hype-pool',
}));
