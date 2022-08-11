import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const ipfsSecret = `${process.env.REACT_APP_IPFS_SECRET}`;
const ipfsProject = `${process.env.REACT_APP_IPFS_PROJECT_ID}`;
const authorization = 'Basic ' + Buffer.from(ipfsProject + ':' + ipfsSecret).toString('base64');

export const ipfsBaseUrl = `https://hype.infura-ipfs.io/ipfs/`;

export const ipfsClient = create({
  host: `ipfs.infura.io`,
  port: 5001,
  protocol: `https`,
  headers: {
    authorization,
  },
});
