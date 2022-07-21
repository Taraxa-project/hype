import { ethers } from 'ethers';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ethereum } from '@taraxa-hype/config';
import Escrow from './contracts/DynamicEscrow.json';
import { Contract, ContractInterface } from '@ethersproject/contracts';

export enum ContractTypes {
  ESCROW,
}

export type ContractInstance = { [address: string]: Contract };

@Injectable()
export class BlockchainService {
  private provider: ethers.providers.JsonRpcProvider;

  private contractInstances: ContractInstance = {};

  constructor(
    @Inject(ethereum.KEY)
    ethereumConfig: ConfigType<typeof ethereum>,
  ) {
    this.provider = new ethers.providers.JsonRpcProvider({
      url: ethereumConfig.provider,
      timeout: 2000,
    });
  }

  getProvider() {
    return this.provider;
  }

  getContractInstance(type: ContractTypes, address: string): Contract {
    if (this.contractInstances[address]) {
      return this.contractInstances[address];
    }
    switch (type) {
      case ContractTypes.ESCROW:
        return (this.contractInstances[address] = new Contract(
          address,
          Escrow as ContractInterface,
          this.provider,
        ));
    }
  }
}
