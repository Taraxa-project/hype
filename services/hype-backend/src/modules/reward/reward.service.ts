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
import { InjectGraphQLClient } from '@golevelup/nestjs-graphql-request';
import { gql, GraphQLClient } from 'graphql-request';
import * as abi from 'ethereumjs-abi';
import * as ethUtil from 'ethereumjs-util';
import { Raw, Repository } from 'typeorm';
import { HypeReward } from '../../entities/reward.entity';
import { PoolClaim, RewardStateDto, TotalUnclaimed } from './rewardState.dto';
import { HypeClaim } from '../../entities/claim.entity';
import { ImpressionDto } from './impression.dto';
import { UsersService } from '../user/user.service';
import { IPool } from '../../models';
import { ClaimDto } from './claim.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

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
    private readonly ethereumConfig: ConfigType<typeof ethereum>,
    @Inject(auth.KEY)
    private readonly authConfig: ConfigType<typeof auth>,
    @InjectRepository(HypeReward)
    private readonly rewardRepository: Repository<HypeReward>,
    @InjectRepository(HypeClaim)
    private readonly claimRepository: Repository<HypeClaim>,
    private userService: UsersService,
    @InjectGraphQLClient()
    private readonly graphQLClient: GraphQLClient,
  ) {
    this.privateKey = Buffer.from(this.ethereumConfig.privateSigningKey, 'hex');
    this.gsSecret = authConfig.gsSecret;
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  async checkClaims() {
    this.logger.debug('Called every 6 hours');
    const claims = await this.claimRepository.find({
      where: {
        claimed: false,
      },
    });
    if (claims.length > 0) {
      await Promise.all(
        claims.map(async (claim: HypeClaim) => {
          const onChainclaims = await this.getClaimedEvents(
            claim.poolId,
            claim.rewardee,
            claim.amount,
          );
          if (onChainclaims.claimedEvents.length > 0) {
            this.logger.log(`Found unclaimed claims`);
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

  private async getPoolById(id: string): Promise<{ hypePool: IPool }> {
    return await this.graphQLClient.request(
      gql`
        query HypePoolById($id: Bytes) {
          hypePool(id: $id) {
            id
            title
            tokenName
            network
            tokenAddress
            active
            projectName
            description
            projectDescription
            uri
            cap
            creator
            endDate
            startDate
            duration
            impressionReward
            word
          }
        }
      `,
      {
        id,
      },
    );
  }

  private async getClaimedEvents(
    poolId: string,
    receiver: string,
    weiAmount: string,
  ): Promise<{
    claimedEvents: {
      poolId: string;
      receiver: string;
      weiAmount: string;
    }[];
  }> {
    return await this.graphQLClient.request(
      gql`
        query ClaimedEvents(
          $poolId: String
          $receiver: String
          $weiAmount: String
        ) {
          claimedEvents(
            where: {
              poolId: $poolId
              receiver: $receiver
              weiAmount: $weiAmount
            }
          ) {
            weiAmount
            receiver
            poolId
          }
        }
      `,
      {
        poolId,
        receiver,
        weiAmount,
      },
    );
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
        const result: { hypePool: IPool } = await this.getPoolById(
          claim.poolId,
        );
        return {
          ...claim,
          pool: result.hypePool,
        };
      }),
    );
    const claims: PoolClaim[] = await Promise.all(
      fetchedClaims.map(async (claim) => {
        const result: { hypePool: IPool } = await this.getPoolById(
          claim.poolId,
        );
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
        const result: { hypePool: IPool } = await this.getPoolById(poolId);
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
    console.log('Saved claim: ', savedClaim);
    return savedClaim;
  }

  async saveImpressions(impressions: ImpressionDto[]): Promise<any> {
    await Promise.all(
      impressions.map(async (impression: ImpressionDto) => {
        const user = await this.userService.getUserByTelegramId(
          impression.user_id,
        );
        if (!user) {
          return;
        }
        const result: { hypePool: IPool } = await this.getPoolById(
          impression.pool_id,
        );
        const pool = result.hypePool;
        const rewardValue =
          (impression.message_impressions / 1000) *
          Number(pool.impressionReward);

        const newReward = this.rewardRepository.create({
          amount: rewardValue?.toString(),
          tokenAddress: pool.tokenAddress,
          rewardee: user.address,
          poolId: impression.pool_id,
        });
        const saved = await this.rewardRepository.save(newReward);
        // eslint-disable-next-line no-console
        console.log('Saved: ', saved);
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
        const result: { hypePool: IPool } = await this.getPoolById(
          reward.poolId,
        );
        pools.push(result.hypePool);
      }),
    );
    return pools;
  }
}
