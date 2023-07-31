import { ethers } from 'ethers';
import ABIs from '../abi';
import { PoolStatus } from '../models';

export async function getPoolDetailsById(id: string, provider: ethers.providers.Provider) {
  const contract = new ethers.Contract(
    process.env.REACT_APP_HYPE_ADDRESS || '',
    ABIs.contracts.HypePool.abi,
    provider,
  );
  if (contract && contract.provider) {
    return await contract.getPool(id);
  } else throw new Error(`Cannot initalize Pool at ${process.env.REACT_APP_HYPE_ADDRESS}`);
}

export function getStatusDisplayName(status: string): string {
  if (!status) {
    return 'NA';
  }
  switch (status.toUpperCase()) {
    case 'CREATED':
      return PoolStatus.CREATED;
    case 'FUNDED':
      return PoolStatus.FUNDED;
    case 'STARTED':
      return PoolStatus.STARTED;
    case 'EXPIRED':
      return PoolStatus.EXPIRED;
    case 'ENDED':
      return PoolStatus.ENDED;
    default:
      return status;
  }
}

export function getStatusColor(status: string): string {
  if (!status) {
    return 'NA';
  }
  switch (status.toUpperCase()) {
    case 'CREATED':
      return '#C2C2C2';
    case 'FUNDED':
      return '#C2C2C2';
    case 'STARTED':
      return '#15AC5B';
    case 'EXPIRED':
      return '#DDA25D';
    case 'ENDED':
      return '#F7614A';
    default:
      return '#C2C2C2';
  }
}

