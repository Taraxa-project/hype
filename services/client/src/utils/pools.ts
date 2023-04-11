import { ethers } from 'ethers';
import ABIs from '../abi';

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
