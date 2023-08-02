import { ethers } from 'ethers';
import ABIs from '../abi';
import { PoolStatus } from '../models';
import { DateTime } from 'luxon';

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

function checkPoolStatusBasedOnDate(endDate: number, status: string): string {
  const poolEndDate = DateTime.fromMillis(endDate * 1000);
  const now = DateTime.now();
  if (endDate === 0) {
    // This corresponds to the end date being null in the smart contract
    // console.log('End date is null');
    return status;
  } else if (now < poolEndDate) {
    // This corresponds to the 'isActive' check in the smart contract
    // console.log('Pool is active');
    return 'STARTED';
  } else if (now < poolEndDate.plus({ weeks: 1 })) {
    // This corresponds to the 'isGracePeriod' check in the smart contract
    // console.log('Pool is in grace period');
    return 'EXPIRED';
  } else {
    // This corresponds to the 'isExpired' check in the smart contract
    // console.log('Pool is expired');
    return 'ENDED';
  }
}

export function getStatusDisplayName(status: string, endDate: number): string {
  if (!status || !endDate) {
    return '(not yet active)';
  }
  status = checkPoolStatusBasedOnDate(endDate, status);
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

export function getStatusColor(status: string, endDate: number): string {
  if (!status || !endDate) {
    return '#C2C2C2';
  }
  status = checkPoolStatusBasedOnDate(endDate, status);
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
