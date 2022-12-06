import { ethers } from 'ethers';
import ABIs from '../abi';

export function getERC20TContract(address: string) {
  return new ethers.Contract(address, ABIs.contracts.HypePool.abi);
}

export async function getERC20TokenName(address: string) {
  const contract = getERC20TContract(address);
  if (contract) {
    return await contract.symbol();
  } else return 'TARA';
}
