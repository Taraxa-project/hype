import { ethers } from 'ethers';
import ABIs from '../abi';

export function getERC20TContract(address: string) {
  return new ethers.Contract(address, ABIs.contracts.HypeToken.abi);
}

export async function getERC20TokenName(address: string) {
  if (address) {
    const contract = getERC20TContract(address);
    if (contract && contract.provider) {
      return await contract.symbol();
    } else return 'TARA';
  }
}
