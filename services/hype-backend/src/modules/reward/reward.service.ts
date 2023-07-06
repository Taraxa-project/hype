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
import { IsNull, Raw, Repository } from 'typeorm';
import { DateTime } from 'luxon';
import { HypeReward } from '../../entities/reward.entity';
import {
  ImpressionDto,
  ClaimDto,
  PoolClaim,
  RewardStateDto,
  TotalUnclaimed,
  TopTelegramAccountDto,
  PoolStatsDto,
  RewardsDetails,
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
    const rewardsOfAddress = await this.rewardRepository
      .createQueryBuilder('reward')
      .select('reward.telegramGroup, reward.poolId')
      .addSelect('SUM(reward.impressions)', 'totalImpressions')
      .addSelect('SUM(CAST(reward.amount AS DECIMAL))::TEXT', 'totalRewards')
      .where('LOWER(reward.rewardee) = LOWER(:address)', { address })
      .andWhere('reward.claimId IS NULL')
      .groupBy('reward.telegramGroup, reward.poolId')
      .getRawMany();

    const unclaimedClaims = await this.claimRepository
      .createQueryBuilder('claim')
      .where('LOWER(claim.rewardee) = LOWER(:address)', { address })
      .andWhere('claim.claimed = :claimed', { claimed: false })
      .getMany();

    const claimedClaims = await this.claimRepository
      .createQueryBuilder('claim')
      .where('LOWER(claim.rewardee) = LOWER(:address)', { address })
      .andWhere('claim.claimed = :claimed', { claimed: true })
      .getMany();

    const aggregateRewardsByClaimId = async (claimId: number) => {
      return await this.rewardRepository
        .createQueryBuilder('reward')
        .select('reward.telegramGroup', 'telegramGroup')
        .addSelect('SUM(reward.impressions)', 'impressions')
        .addSelect('SUM(CAST(reward.amount AS DECIMAL))::TEXT', 'rewards')
        .where('reward.claimId = :claimId', { claimId })
        .groupBy('reward.telegramGroup, reward.poolId')
        .getRawMany();
    };

    const rewardsReceived: PoolClaim[] = await Promise.all(
      claimedClaims.map(async (claim) => {
        const result: { hypePool: IPool } =
          await this.graphQlService.getPoolById(claim.poolId);
        const rewards = await aggregateRewardsByClaimId(claim.id);
        return {
          ...claim,
          pool: result.hypePool,
          rewards,
        };
      }),
    );

    const claims: PoolClaim[] = await Promise.all(
      unclaimedClaims.map(async (claim) => {
        const result: { hypePool: IPool } =
          await this.graphQlService.getPoolById(claim.poolId);
        const rewards = await aggregateRewardsByClaimId(claim.id);
        return {
          ...claim,
          pool: result.hypePool,
          rewards,
        };
      }),
    );

    const poolIds = Array.from(new Set(rewardsOfAddress.map((r) => r.pool_id)));
    const totalUnclaimed: TotalUnclaimed[] = [];

    await Promise.all(
      poolIds.map(async (poolId) => {
        const rewardsOfPool = rewardsOfAddress.filter(
          (r) => r.pool_id === poolId,
        );
        const rewards: RewardsDetails[] = rewardsOfPool.map((rewardOfPool) => {
          return {
            telegramGroup: rewardOfPool.telegram_group,
            impressions: rewardOfPool.totalImpressions,
            rewards: rewardOfPool.totalRewards,
          };
        });
        const token = rewardsOfPool ? rewardsOfPool[0].tokenAddress : '';
        const unclaimed = rewardsOfPool.reduce(
          (total, unc) =>
            BigNumber.from(total).add(BigNumber.from(unc.totalRewards)),
          BigNumber.from('0'),
        );
        const result: { hypePool: IPool } =
          await this.graphQlService.getPoolById(poolId);
        totalUnclaimed.push({
          unclaimed,
          poolId,
          pool: result.hypePool,
          tokenAddress: token,
          rewards,
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
      claim: IsNull(),
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
    const claim = this.claimRepository.create();
    claim.amount = total.toString();
    claim.claimed = false;
    claim.poolId = poolId;
    claim.rewardee = address;
    claim.tokenAddress = rewardsOfAddress[0].tokenAddress;
    claim.hash = hash;
    claim.nonce = nonce;
    const claimFinalized = await claim.save();

    if (nonce && hash && total) {
      for (const reward of rewardsOfAddress) {
        // Associate the claim to each reward
        reward.claim = claimFinalized;
        const updated = await this.rewardRepository.save(reward);
        if (updated) {
          this.logger.log(
            `Released reward with ID: ${updated.id} for address ${updated.rewardee}`,
          );
        }
      }

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
        if (!pool) {
          throw new NotFoundException('Pool does not exist!');
        }
        const rewardValue =
          impression.message_impressions * Number(pool.impressionReward);

        const newReward = this.rewardRepository.create({
          amount: rewardValue.toString(),
          tokenAddress: pool.tokenAddress,
          rewardee: user ? user.address : null,
          telegramId: impression.user_id.toString(),
          telegramUsername: impression.username,
          telegramGroup: impression.telegram_group,
          impressions: impression.message_impressions,
          poolId: impression.pool_id,
          dateFrom: new Date(impression.from),
          dateTo: new Date(impression.to),
        });

        try {
          const saved = await this.rewardRepository.save(newReward);
          return saved;
        } catch (error) {
          this.logger.error(`Error saving reward: ${JSON.stringify(error)}`);
        }
      }),
    );
  }

  async getJoinedPools(address: string): Promise<IPool[]> {
    const rewards = await this.rewardRepository
      .createQueryBuilder('reward')
      .select('DISTINCT reward.poolId')
      .where('reward.rewardee = :address', { address })
      .getRawMany();

    const pools: IPool[] = [];
    await Promise.all(
      rewards.map(async (reward) => {
        const result: { hypePool: IPool } =
          await this.graphQlService.getPoolById(reward.pool_id);
        if (result?.hypePool) {
          pools.push(result.hypePool);
        }
      }),
    );
    return pools;
  }

  async getPoolStats(poolId: string): Promise<PoolStatsDto> {
    const { total: tokensAwarded } = await this.rewardRepository
      .createQueryBuilder('reward')
      .select('SUM(CAST(reward.amount AS DECIMAL))::TEXT', 'total')
      .where('reward.poolId = :poolId', { poolId })
      .getRawOne();

    const { total: tokensClaimed } = await this.claimRepository
      .createQueryBuilder('claim')
      .select('SUM(CAST(claim.amount AS DECIMAL))::TEXT', 'total')
      .where('claim.claimed = :claimed', { claimed: true })
      .andWhere('claim.poolId = :poolId', { poolId })
      .getRawOne();

    const { total: participants } = await this.rewardRepository
      .createQueryBuilder('reward')
      .select('COUNT(DISTINCT reward.telegramId)', 'total')
      .where('reward.poolId = :poolId', { poolId })
      .getRawOne();

    const { total: impressions } = await this.rewardRepository
      .createQueryBuilder('reward')
      .select('SUM(reward.impressions)', 'total')
      .where('reward.poolId = :poolId', { poolId })
      .andWhere('reward.impressions IS NOT NULL')
      .getRawOne();

    return {
      tokensAwarded,
      tokensClaimed,
      participants,
      impressions,
    };
  }

  async getLeaderboard(poolId: string): Promise<TopTelegramAccountDto[]> {
    const currentDate = DateTime.utc();
    const startDate = currentDate
      .startOf('week')
      .minus({ days: 1 })
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .toJSDate();
    const endDate = currentDate
      .endOf('week')
      .minus({ days: 1 })
      .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
      .toJSDate();

    const qb = this.rewardRepository
      .createQueryBuilder('reward')
      .select('reward.telegramId', 'telegramId')
      .addSelect(
        "CASE WHEN reward.telegramUsername IS NULL THEN reward.telegramId ELSE CONCAT('@', reward.telegramUsername) END",
        'telegramUsername',
      )
      .addSelect('SUM(reward.impressions)', 'totalImpressions')
      .addSelect(
        'ROW_NUMBER() OVER (ORDER BY SUM(reward.impressions) DESC)',
        'rank',
      )
      .where('reward.poolId = :poolId', { poolId })
      .andWhere('reward.impressions IS NOT NULL')
      .andWhere(
        '(reward.telegramUsername IS NOT NULL OR reward.telegramId IS NOT NULL)',
      )
      .andWhere('reward.date_from BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .andWhere('reward.date_to BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('reward.telegramId, reward.telegramUsername')
      .orderBy('"totalImpressions"', 'DESC')
      .take(10);

    return qb.getRawMany();
  }
}
