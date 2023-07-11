import { registerAs } from '@nestjs/config';

export default registerAs('ethereum', () => ({
  privateSigningKey: process.env.PRIVATE_SIGNING_KEY,
  provider: process.env.PROVIDER,
  escrowContractAddress: process.env.ESCROW_CONTRACT_ADDRESS,
}));
