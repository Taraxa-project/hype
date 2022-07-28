import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const ipfsSecret = `${process.env.REACT_AP_PIPFS_SECRET}`;
const ipfsProject = `${process.env.REACT_APP_IPFS_PROJECT_ID}`;
const auth = 'Basic ' + Buffer.from(ipfsProject + ':' + ipfsSecret).toString('base64');

const ipfsEndpoint = `https://ipfs.infura.io:5001`;

export const ipfsBaseUrl = `https://ipfs.infura.io/ipfs/`;

export const ipfsClient = create({
  url: ipfsEndpoint,
  headers: {
    auth,
  },
});
