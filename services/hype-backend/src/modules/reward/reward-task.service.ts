import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RewardService } from './reward.service';
import { GraphQlService } from '../graphql';
import { IPool } from '../../models';
import { HypeClaim } from '../../entities';
import { DateTime } from 'luxon';

@Injectable()
export class RewardTaskService implements OnModuleInit {
  private readonly logger = new Logger(RewardTaskService.name);

  constructor(
    private rewardService: RewardService,
    private graphQlService: GraphQlService,
  ) {}
  onModuleInit() {
    this.logger.debug(`Init ${RewardTaskService.name} cron`);
  }

  @Cron('0 23 * * 6') // Once a week Saturday at 23:00
  async calculateRewardsForLeaderboard() {
    this.logger.debug('Calculating rewards top user in Leaderboard...');
    const hypePools = await this.getAllActivePools();

    await Promise.all(
      hypePools.map(async (pool: IPool) => {
        const leaderboard = await this.rewardService.getLeaderboard(pool.id);
        const leaderRewards = pool.leaderRewards;

        if (leaderboard.length === 0 || leaderRewards.length === 0) {
          return;
        }

        for (
          let i = 0;
          i < Math.min(leaderRewards.length, leaderboard.length);
          i++
        ) {
          const leader = leaderboard[i];
          const rewardAmount = leaderRewards[i];
          const user = await this.rewardService.getUserByTelegramId(
            leader.telegramId.toString(),
          );
          if (!user) {
            console.warn(
              `User with telegram id: ${leader.telegramId.toString()} was not found`,
            );
            continue;
          }
          this.logger.debug(`Saving bonus in the reward`);
          const dateFrom = DateTime.utc().toISODate();
          const savedBonus = await this.rewardService.saveRewardBonus(
            rewardAmount.toString(),
            pool.tokenAddress,
            user ? user.address : null,
            user.telegramId.toString(),
            user.username,
            pool.id,
            dateFrom,
          );
          this.logger.log(
            `Saved ${savedBonus.amount} bonus for ${savedBonus.rewardee}`,
          );
        }
      }),
    );
  }

  @Cron(CronExpression.EVERY_HOUR)
  async checkClaims() {
    this.logger.debug('Called checkClaims worker every hour...');
    const claims = await this.rewardService.getUnClaimedClaims();
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

  async getAllActivePools(): Promise<IPool[]> {
    const allActivePools: IPool[] = [];
    const take = 100;
    let skip = 0;

    while (true) {
      try {
        const { hypePools } = await this.graphQlService.getActivePools(
          take,
          skip,
        );
        allActivePools.push(...hypePools);
        if (hypePools.length < take) {
          break;
        }

        skip += take;
      } catch (e) {
        console.error(e);
        break;
      }
    }

    return allActivePools;
  }
}
