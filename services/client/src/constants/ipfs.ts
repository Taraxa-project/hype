import { create, Options } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const ipfsSecret = `${process.env.REACT_APP_IPFS_SECRET}`;
const ipfsProject = `${process.env.REACT_APP_IPFS_PROJECT_ID}`;
const authorization = 'Basic ' + Buffer.from(ipfsProject + ':' + ipfsSecret).toString('base64');

export const ipfsBaseUrl = `${process.env.REACT_APP_IPFS_BASE_URL}`;

const ipfsHost = `${process.env.REACT_APP_IPFS_HOST}`;
const ipfsPort = +process.env.REACT_APP_IPFS_PORT;
const ipfsProtocol = `${process.env.REACT_APP_IPFS_PROTOCOL}`;
const ipfsUseAuth = `${process.env.REACT_APP_IPFS_USE_AUTH}`;

const ipfsOptions: Options = {
  host: ipfsHost,
  port: ipfsPort,
  protocol: ipfsProtocol,
};

if (ipfsSecret && ipfsProject && ipfsUseAuth === 'true') {
  ipfsOptions.headers = {
    authorization,
  };
}

export const ipfsClient = create(ipfsOptions);
