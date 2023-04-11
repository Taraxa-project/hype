import { create, Options } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import * as dotenv from 'dotenv';

dotenv.config();

const ipfsSecret = `${process.env.IPFS_SECRET}`;
const ipfsProject = `${process.env.IPFS_PROJECT_ID}`;
const authorization = `Basic ${Buffer.from(
  `${ipfsProject}:${ipfsSecret}`,
).toString('base64')}`;

export const ipfsBaseUrl = `${process.env.IPFS_BASE_URL}`;

const ipfsHost = `${process.env.IPFS_HOST}`;
const ipfsPort = +process.env.IPFS_PORT;
const ipfsProtocol = `${process.env.IPFS_PROTOCOL}`;
const ipfsUseAuth = `${process.env.IPFS_USE_AUTH}`;
const ipfsUrl = `${process.env.IPFS_URL}`;
let ipfsOptions: Options;

if (ipfsUrl) {
  ipfsOptions = {
    url: ipfsUrl,
  };
} else {
  ipfsOptions = {
    host: ipfsHost,
    port: ipfsPort,
    protocol: ipfsProtocol,
  };
}

export const fullIpfsUrl = (resourcePath: string) => {
  return `${ipfsBaseUrl}${resourcePath}`;
};

if (ipfsSecret && ipfsProject && ipfsUseAuth === 'true') {
  ipfsOptions.headers = {
    authorization,
  };
}

export const ipfsClient = create(ipfsOptions);
