import { ethers, utils } from 'ethers';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ethereum } from '@taraxa-hype/config';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import ABIs from '../../abi';

export enum ContractTypes {
  ESCROW,
  HYPE_POOL,
  CLAIM,
}

export enum ProviderType {
  PROVIDER,
  SIGNER,
  WALLET,
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

  getContractInstance(
    type: ContractTypes,
    address: string,
    providerType: ProviderType,
  ): Contract {
    if (this.contractInstances[address]) {
      return this.contractInstances[address];
    }
    const provider = this.getProviderType(providerType);

    switch (type) {
      case ContractTypes.ESCROW:
        return (this.contractInstances[address] = new Contract(
          address,
          new utils.Interface(
            ABIs.contracts.DynamicEscrow.abi,
          ) as ContractInterface,
          provider,
        ));
      case ContractTypes.HYPE_POOL:
        return (this.contractInstances[address] = new Contract(
          address,
          new utils.Interface(ABIs.contracts.HypePool.abi) as ContractInterface,
          provider,
        ));
    }
  }

  getProviderType(
    providerType: ProviderType,
  ): ethers.providers.JsonRpcProvider | ethers.Signer | ethers.Wallet {
    switch (providerType) {
      case ProviderType.PROVIDER:
        return this.getProvider();
      case ProviderType.SIGNER:
        return this.getSigner();
      case ProviderType.WALLET:
        return this.getWallet();
    }
  }
}
