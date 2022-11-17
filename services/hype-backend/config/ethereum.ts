import { registerAs } from '@nestjs/config';

export default registerAs('ethereum', () => ({
  escrowContractAddress: process.env.ESCROW_CONTRACT_ADDRESS,
  hypeContractAddress: process.env.HYPE_CONTRACT_ADDRESS,
  claimContractAddress: process.env.CLAIM_CONTRACT_ADDRESS,
  privateSigningKey: process.env.PRIVATE_SIGNING_KEY,
  provider: process.env.PROVIDER,
}));
