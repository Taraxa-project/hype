import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ethereum } from '@taraxa-hype/config';
import { Repository } from 'typeorm';
import { BlockchainService, ContractTypes, ProviderType } from '../blockchain';
import { RewardDto } from './reward.dto';
import { HypeReward } from './reward.entity';

@Injectable()
export class RewardService {
  constructor(
    @Inject(ethereum.KEY)
    private readonly ethereumConfig: ConfigType<typeof ethereum>,
    private readonly blockchainService: BlockchainService,
    @InjectRepository(HypeReward)
    private readonly rewardRepository: Repository<HypeReward>,
  ) {}

  async accrueRewards(rewardDto: RewardDto): Promise<HypeReward> {
    const newReward = this.rewardRepository.create({
      amount: rewardDto.value,
      tokenAddress: rewardDto.rewardAddress,
      rewardee: rewardDto.targetAddress,
    });
    const saved = await this.rewardRepository.save(newReward);
    return saved;
  }
}
