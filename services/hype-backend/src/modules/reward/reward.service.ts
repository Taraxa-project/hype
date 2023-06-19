import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ethereum, auth } from '@taraxa-hype/config';
import { BigNumber } from 'ethers';
import * as abi from 'ethereumjs-abi';
import * as ethUtil from 'ethereumjs-util';
import { Raw, Repository } from 'typeorm';
import { HypeReward } from '../../entities/reward.entity';
import {
  ImpressionDto,
  ClaimDto,
  PoolClaim,
  RewardStateDto,
  TotalUnclaimed,
} from './dto';
import { HypeClaim } from '../../entities/claim.entity';
import { IPool } from '../../models';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GraphQlService } from '../graphql';
import { HypeUser } from '../user';

export interface ClaimResult {
  nonce: number;
  hash: string;
  claimedAmount: BigNumber;
  claim: HypeClaim;
}

@Injectable()
export class RewardService {
  privateKey: Buffer;

  gsSecret: string;

  private logger = new Logger(RewardService.name);

  constructor(
    @Inject(ethereum.KEY)
    ethereumConfig: ConfigType<typeof ethereum>,
    @Inject(auth.KEY)
    authConfig: ConfigType<typeof auth>,
    @InjectRepository(HypeReward)
    private readonly rewardRepository: Repository<HypeReward>,
    @InjectRepository(HypeClaim)
    private readonly claimRepository: Repository<HypeClaim>,
    @InjectRepository(HypeUser)
    private readonly userRepository: Repository<HypeUser>,
    private graphQlService: GraphQlService,
  ) {
    this.privateKey = Buffer.from(ethereumConfig.privateSigningKey, 'hex');
    this.gsSecret = authConfig.gsSecret;
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async checkClaims() {
    this.logger.debug('Called every day at 1 AM');
    const claims = await this.claimRepository.find({
      where: {
        claimed: false,
      },
    });
    if (claims.length > 0) {
      await Promise.all(
        claims.map(async (claim: HypeClaim) => {
          const onChainclaims = await this.graphQlService.getClaimedEvents(
            claim.poolId,
            claim.rewardee,
            claim.amount,
          );
          if (onChainclaims.claimedEvents.length > 0) {
            this.logger.warn(`Found unclaimed claims`);
            claim.claimed = true;
            this.logger.log(`Updating claims`);
            await claim.save();
          }
        }),
      );
    }
  }

  async getAllRewards() {
    return await this.rewardRepository.find();
  }

  private async getUserByTelegramId(telegramId: string): Promise<HypeUser> {
    return await this.userRepository.findOne({
      where: {
        telegramId,
      },
    });
  }

  async getRewardSummaryForAddress(address: string): Promise<RewardStateDto> {
    const rewardsOfAddress = await this.rewardRepository.findBy({
      rewardee: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:address)`, {
        address,
      }),
      claimed: false,
    });
    const fetchedClaims = await this.claimRepository.findBy({
      rewardee: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:address)`, {
        address,
      }),
      claimed: false,
    });
    const rewardClaims = await this.claimRepository.findBy({
      rewardee: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:address)`, {
        address,
      }),
      claimed: true,
    });

    const rewardsReceived: PoolClaim[] = await Promise.all(
      rewardClaims.map(async (claim) => {
        const result: { hypePool: IPool } =
          await this.graphQlService.getPoolById(claim.poolId);
        return {
          ...claim,
          pool: result.hypePool,
        };
      }),
    );
    const claims: PoolClaim[] = await Promise.all(
      fetchedClaims.map(async (claim) => {
        const result: { hypePool: IPool } =
          await this.graphQlService.getPoolById(claim.poolId);
        return {
          ...claim,
          pool: result.hypePool,
        };
      }),
    );
    const poolIds = Array.from(new Set(rewardsOfAddress.map((r) => r.poolId)));
    const totalUnclaimed: TotalUnclaimed[] = [];

    await Promise.all(
      poolIds.map(async (poolId) => {
        const rewardsOfPool = rewardsOfAddress.filter(
          (r) => r.poolId === poolId,
        );
        const token = rewardsOfPool ? rewardsOfPool[0].tokenAddress : '';
        const unclaimed = rewardsOfPool.reduce(
          (total, unc) => BigNumber.from(total).add(BigNumber.from(unc.amount)),
          BigNumber.from('0'),
        );
        const result: { hypePool: IPool } =
          await this.graphQlService.getPoolById(poolId);
        totalUnclaimed.push({
          unclaimed,
          poolId,
          pool: result.hypePool,
          tokenAddress: token,
        });
      }),
    );
    return {
      totalUnclaimed,
      claims,
      rewardsReceived,
    };
  }

  async releaseRewardHash(
    address: string,
    poolId: string,
  ): Promise<ClaimResult> {
    const rewardsOfAddress = await this.rewardRepository.findBy({
      poolId,
      rewardee: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:address)`, {
        address,
      }),
      claimed: false,
    });

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
    let tokenAddress = '';
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
      claim.nonce = nonce;
      const claimFinalized = await claim.save();
      return {
        nonce,
        hash,
        claimedAmount: total,
        claim: claimFinalized,
      };
    }
    throw new InternalServerErrorException(
      `Unable to calculate hash for ${poolId} and ${address}`,
    );
  }

  async claim(claim: ClaimDto): Promise<HypeClaim> {
    const fetchedClaim = await this.claimRepository.findOneBy({
      id: claim.id,
      rewardee: claim.rewardee,
      poolId: claim.poolId,
    });
    if (!fetchedClaim) {
      throw new NotFoundException('Claim not found!');
    }
    fetchedClaim.claimed = true;
    const savedClaim = await fetchedClaim.save();
    return savedClaim;
  }

  async saveImpressions(impressions: ImpressionDto[]): Promise<void> {
    await Promise.all(
      impressions.map(async (impression: ImpressionDto) => {
        const user = await this.getUserByTelegramId(
          impression.user_id.toString(),
        );
        const result: { hypePool: IPool } =
          await this.graphQlService.getPoolById(impression.pool_id);
        const pool = result.hypePool;
        const rewardValue =
          impression.message_impressions * Number(pool.impressionReward);

        const newReward = this.rewardRepository.create({
          amount: rewardValue.toString(),
          tokenAddress: pool.tokenAddress,
          rewardee: user ? user.address : null,
          telegramId: impression.user_id.toString(),
          poolId: impression.pool_id,
          dateFrom: new Date(impression.from),
          dateTo: new Date(impression.to),
        });
        const saved = await this.rewardRepository.save(newReward);
        return saved;
      }),
    );
  }

  async getJoinedPools(address: string): Promise<IPool[]> {
    const rewards: Partial<HypeReward[]> = await this.rewardRepository
      .createQueryBuilder()
      .select('DISTINCT "poolId"')
      .where('rewardee = :address', { address })
      .getRawMany();

    const pools: IPool[] = [];
    await Promise.all(
      rewards.map(async (reward) => {
        const result: { hypePool: IPool } =
          await this.graphQlService.getPoolById(reward.poolId);
        pools.push(result.hypePool);
      }),
    );
    return pools;
  }
}
