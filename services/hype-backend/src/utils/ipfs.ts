import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const ipfsSecret = `${process.env.DB_HOST}`;
const ipfsProject = `${process.env.DB_USERNAME}`;
console.log('ipfsSecret: ', ipfsSecret);
console.log('ipfsProject: ', ipfsProject);
export const ipfsAuthorization =
  'Basic ' + Buffer.from(ipfsProject + ':' + ipfsSecret).toString('base64');

export const ipfsBaseUrl =
  `${process.env.IPFS_DEDICATED_GATEWAY}` ||
  'https://hype.infura-ipfs.io/ipfs/';

export const fullIpfsUrl = (resourcePath: string) => {
  return `${ipfsBaseUrl}${resourcePath}`;
};

export const ipfsClient = create({
  host: `ipfs.infura.io`,
  port: 5001,
  protocol: `https`,
  headers: {
    authorization: ipfsAuthorization,
  },
});
