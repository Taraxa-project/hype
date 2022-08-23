import { ethers, utils } from 'ethers';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ethereum } from '@taraxa-hype/config';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import ABIs from '../../abi';

export enum ContractTypes {
  ESCROW,
  HYPE_POOL,
}

export type ContractInstance = { [address: string]: Contract };

@Injectable()
export class BlockchainService {
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private signer: ethers.Signer;
  private contractInstances: ContractInstance = {};

  constructor(
    @Inject(ethereum.KEY)
    ethereumConfig: ConfigType<typeof ethereum>,
  ) {
    this.provider = new ethers.providers.JsonRpcProvider({
      url: ethereumConfig.provider,
      timeout: 2000,
    });
    this.signer = this.provider.getSigner();
    this.wallet = new ethers.Wallet(
      ethereumConfig.privateSigningKey,
      this.provider,
    );
  }

  getProvider() {
    return this.provider;
  }

  getSigner() {
    return this.signer;
  }

  getWallet() {
    return this.wallet;
  }

  getContractInstance(type: ContractTypes, address: string): Contract {
    if (this.contractInstances[address]) {
      return this.contractInstances[address];
    }
    switch (type) {
      case ContractTypes.ESCROW:
        return (this.contractInstances[address] = new Contract(
          address,
          new utils.Interface(
            ABIs.contracts.DynamicEscrow.abi,
          ) as ContractInterface,
          this.wallet,
        ));
      case ContractTypes.HYPE_POOL:
        return (this.contractInstances[address] = new Contract(
          address,
          new utils.Interface(ABIs.contracts.HypePool.abi) as ContractInterface,
          this.wallet,
        ));
    }
  }
}
