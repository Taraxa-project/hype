import { registerAs } from '@nestjs/config';

export default registerAs('ethereum', () => ({
  privateSigningKey: process.env.PRIVATE_SIGNING_KEY,
  provider: process.env.PROVIDER,
  echoContract: process.env.ECHO_CONTRACT,
}));
