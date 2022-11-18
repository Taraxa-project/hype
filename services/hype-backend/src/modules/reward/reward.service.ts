import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ethereum } from '@taraxa-hype/config';
import { BigNumber } from 'ethers';
import * as abi from 'ethereumjs-abi';
import * as ethUtil from 'ethereumjs-util';
import { Raw, Repository } from 'typeorm';
import { RewardDto } from './reward.dto';
import { HypeReward } from './reward.entity';

@Injectable()
export class RewardService {
  privateKey: Buffer;
  private logger = new Logger(RewardService.name);
  constructor(
    @Inject(ethereum.KEY)
    private readonly ethereumConfig: ConfigType<typeof ethereum>,
    @InjectRepository(HypeReward)
    private readonly rewardRepository: Repository<HypeReward>,
  ) {
    this.privateKey = Buffer.from(this.ethereumConfig.privateSigningKey, 'hex');
  }

  async accrueRewards(rewardDto: RewardDto): Promise<HypeReward> {
    const newReward = this.rewardRepository.create({
      amount: rewardDto.value,
      tokenAddress: rewardDto.rewardAddress,
      rewardee: rewardDto.targetAddress,
    });
    const saved = await this.rewardRepository.save(newReward);
    return saved;
  }

  async releaseRewardHash(address: string) {
    const rewardsOfAddress = await this.rewardRepository.findBy({
      rewardee: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:address)`, {
        address,
      }),
    });
    if (rewardsOfAddress.length < 1)
      throw new NotFoundException(
        HypeReward,
        `There are no rewards for the address ${address}`,
      );
    const biggestId = rewardsOfAddress
      .map((r) => r.id)
      .sort((a, b) => a - b)[0];
    const total = BigNumber.from('0');
    rewardsOfAddress
      .map((r) => r.amount)
      .forEach((value) => {
        total.add(BigNumber.from(value));
      });
    const nonce = biggestId * 13;
    const encodedPayload = abi.soliditySHA3(
      ['address', 'uint', 'uint'],
      [address, total, nonce],
    );

    const { v, r, s } = ethUtil.ecsign(encodedPayload, this.privateKey);
    const hash = ethUtil.toRpcSig(v, r, s);
    if (nonce && hash && total) {
      for (const reward of rewardsOfAddress) {
        reward.claimed = true;
        const updated = await this.rewardRepository.save(reward);
        if (updated) {
          this.logger.log(
            `Released reward with ID: ${updated.id} for address ${updated.rewardee}`,
          );
        }
      }
    }
    return {
      nonce,
      hash,
      claimedAmount: total,
    };
  }
}
