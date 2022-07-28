import { ipfsBaseUrl } from '../constants';

export const fullIpfsUrl = (resourcePath: string) => {
  return `${ipfsBaseUrl}${resourcePath}`;
};
