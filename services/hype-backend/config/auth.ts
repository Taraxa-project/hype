import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  walletEndpoint: process.env.WALLET_HOST || 'http://localhost:3006',
  secret: process.env.AUTH_SECRET || 'secret',
  tokenExpiry: process.env.JWT_EXPIRY_TIME || '7 days',
  gsSecret: process.env.GS_SECRET,
  subGraphEndpoint:
    process.env.SUBGRAPH_HOST ||
    'https://indexer.qa.gethyped.app/subgraphs/name/taraxa/hype-pool',
}));
