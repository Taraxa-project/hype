import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ethereum } from '@taraxa-hype/config';
import { BlockchainService, ContractTypes, ProviderType } from '../blockchain';

@Injectable()
export class RewardService {
  constructor(
    @Inject(ethereum.KEY)
    private readonly ethereumConfig: ConfigType<typeof ethereum>,
    private readonly blockchainService: BlockchainService,
  ) {}

  private getEscrowContractInstance() {
    const escrowContractInstance = this.blockchainService.getContractInstance(
      ContractTypes.ESCROW,
      this.ethereumConfig.escrowContractAddress,
      ProviderType.WALLET,
    );
    return escrowContractInstance;
  }
}
