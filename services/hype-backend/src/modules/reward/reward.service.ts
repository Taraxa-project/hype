import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ethereum } from '@taraxa-hype/config';
import { BigNumber } from 'ethers';
import * as abi from 'ethereumjs-abi';
import * as ethUtil from 'ethereumjs-util';
import { Raw, Repository } from 'typeorm';
import { RewardDto } from './reward.dto';
import { HypeReward } from './reward.entity';
import { RewardStateDto } from './rewardState.dto';
import { HypeClaim } from './claim.entity';

export interface ClaimResult {
  nonce: number;
  hash: string;
  claimedAmount: BigNumber;
  claim: HypeClaim;
}

@Injectable()
export class RewardService {
  privateKey: Buffer;
  private logger = new Logger(RewardService.name);
  constructor(
    @Inject(ethereum.KEY)
    private readonly ethereumConfig: ConfigType<typeof ethereum>,
    @InjectRepository(HypeReward)
    private readonly rewardRepository: Repository<HypeReward>,
    @InjectRepository(HypeClaim)
    private readonly claimRepository: Repository<HypeClaim>,
  ) {
    this.privateKey = Buffer.from(this.ethereumConfig.privateSigningKey, 'hex');
  }

  async getAllRewards() {
    return await this.rewardRepository.find();
  }

  async getRewardSummaryForAddress(address: string): Promise<RewardStateDto> {
    const rewardsOfAddress = await this.rewardRepository.findBy({
      rewardee: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:address)`, {
        address,
      }),
      claimed: false,
    });
    const claims = await this.claimRepository.findBy({
      rewardee: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:address)`, {
        address,
      }),
      claimed: false,
    });
    if (rewardsOfAddress?.length + claims?.length === 0) {
      throw new NotFoundException(
        'No rewards or claims found for given address.',
      );
    }
    const poolIds = Array.from(new Set(rewardsOfAddress.map((r) => r.poolId)));
    const unclaimeds: {
      unclaimed: BigNumber;
      poolId: number;
      tokenAddress: string;
    }[] = [];

    poolIds.forEach((poolId) => {
      const rewardsOfPool = rewardsOfAddress.filter((r) => r.poolId === poolId);
      const token = rewardsOfPool ? rewardsOfPool[0].tokenAddress : undefined;
      const unclaimed = rewardsOfPool.reduce(
        (total, unc) => BigNumber.from(total).add(BigNumber.from(unc.amount)),
        BigNumber.from('0'),
      );
      unclaimeds.push({
        unclaimed,
        poolId,
        tokenAddress: token,
      });
    });
    return {
      totalUnclaimeds: unclaimeds,
      claims,
    };
  }

  async accrueRewards(rewardDto: RewardDto): Promise<HypeReward> {
    const newReward = this.rewardRepository.create({
      amount: rewardDto.value,
      tokenAddress: rewardDto.rewardAddress,
      rewardee: rewardDto.targetAddress,
      poolId: rewardDto.poolID,
    });
    const saved = await this.rewardRepository.save(newReward);
    return saved;
  }

  async releaseRewardHash(
    address: string,
    poolId: number,
  ): Promise<ClaimResult> {
    const rewardsOfAddress = await this.rewardRepository.findBy({
      poolId,
      rewardee: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:address)`, {
        address,
      }),
      claimed: false,
    });
    if (rewardsOfAddress.length < 1)
      throw new NotFoundException(
        HypeReward,
        `There are no unclaimed rewards for the address ${address} in pool ${poolId}`,
      );
    const biggestId = rewardsOfAddress
      .map((r) => r.id)
      .sort((a, b) => a - b)[0];
    let total = BigNumber.from('0');
    rewardsOfAddress
      .map((r) => r.amount)
      .forEach((value) => {
        const bn = BigNumber.from(value);
        total = total.add(bn);
      });
    const nonce = biggestId * 13;
    const encodedPayload = abi.soliditySHA3(
      ['address', 'uint', 'uint'],
      [address, total.toString(), nonce],
    );
    const { v, r, s } = ethUtil.ecsign(encodedPayload, this.privateKey);
    const hash = ethUtil.toRpcSig(v, r, s);
    let tokenAddress;
    if (nonce && hash && total) {
      for (const reward of rewardsOfAddress) {
        reward.claimed = true;
        tokenAddress = reward.tokenAddress;
        const updated = await this.rewardRepository.save(reward);
        if (updated) {
          this.logger.log(
            `Released reward with ID: ${updated.id} for address ${updated.rewardee}`,
          );
        }
      }
      const claim = this.claimRepository.create();
      claim.amount = total.toString();
      claim.claimed = false;
      claim.poolId = poolId;
      claim.rewardee = address;
      claim.tokenAddress = tokenAddress;
      claim.hash = hash;
      const claimFinalized = await claim.save();
      return {
        nonce,
        hash,
        claimedAmount: total,
        claim: claimFinalized,
      };
    } else
      throw new InternalServerErrorException(
        `Unable to calculate hash for ${poolId} and ${address}`,
      );
  }
}
