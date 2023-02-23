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
import { RewardDto } from './reward.dto';
import { HypeReward } from '../../entities/reward.entity';
import { RewardStateDto } from './rewardState.dto';
import { HypeClaim } from '../../entities/claim.entity';
import { ImpressionDto } from './impression.dto';
import { UsersService } from '../user/user.service';
import { IPool } from '../../models';

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

  async getAllRewards() {
    return await this.rewardRepository.find();
  }

  private async getPoolById(id: number): Promise<IPool> {
    return await this.graphQLClient.request(
      gql`
        query HypePoolById($id: Int) {
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
    if (rewardsOfAddress?.length === 0 && claims?.length === 0) {
      throw new NotFoundException(
        'No rewards or claims found for given address.',
      );
    }
    const poolIds = Array.from(new Set(rewardsOfAddress.map((r) => r.poolId)));
    const totalUnclaimed: {
      unclaimed: BigNumber;
      poolId: number;
      tokenAddress: string;
    }[] = [];

    poolIds.forEach((poolId) => {
      const rewardsOfPool = rewardsOfAddress.filter((r) => r.poolId === poolId);
      const token = rewardsOfPool ? rewardsOfPool[0].tokenAddress : '';
      const unclaimed = rewardsOfPool.reduce(
        (total, unc) => BigNumber.from(total).add(BigNumber.from(unc.amount)),
        BigNumber.from('0'),
      );
      totalUnclaimed.push({
        unclaimed,
        poolId,
        tokenAddress: token,
      });
    });
    return {
      totalUnclaimed,
      claims,
    };
  }

  // TODO - Remove this
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

  async saveImpressions(impressions: ImpressionDto[]): Promise<void> {
    await Promise.all(
      impressions.map(async (impression: ImpressionDto) => {
        const user = await this.userService.getUserByTelegramId(
          impression.user_id,
        );
        if (!user) {
          return;
        }
        const pool: IPool = await this.getPoolById(impression.pool_id);
        const rewardValue =
          (impression.message_impressions / 1000) * pool.impressionReward;

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
}
