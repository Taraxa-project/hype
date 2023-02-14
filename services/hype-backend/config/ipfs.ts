import { registerAs } from '@nestjs/config';

export default registerAs('ipfs', () => ({
  ipfsSecret: process.env.IPFS_SECRET,
  ipfsProjectId: process.env.IPFS_PROJECT_ID,
  ipfsUrl: process.env.IPFS_URL,
  ipfsHost: process.env.IPFS_HOST,
  ipfsPort: process.env.IPFS_PORT,
  ipfsProtocol: process.env.IPFS_PROTOCOL,
  ipfsBaseUrl: process.env.IPFS_BASE_URL,
  ipfsUseAuth: process.env.IPFS_USE_AUTH,
}));
