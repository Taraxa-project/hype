import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  walletEndpoint: process.env.WALLET_HOST || 'http://localhost:3006',
}));
