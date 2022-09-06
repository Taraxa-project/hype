import { registerAs } from '@nestjs/config';

export default registerAs('ipfs', () => ({
  ipfsSecret: process.env.IPFS_SECRET,
  ipfsProjectId: process.env.IPFS_PROJECT_ID,
  ipfsDedicatedGateway:
    process.env.IPFS_DEDICATED_GATEWAY || 'https://hype.infura-ipfs.io/ipfs/',
}));
