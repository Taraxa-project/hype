import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RewardService } from './reward.service';
import { GraphQlService } from '../graphql';
import { IPool } from '../../models';
import { ethers } from 'ethers';

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
    // Get all current active pools (active = true, endDate > currentDate)
    const { hypePools } = await this.graphQlService.getActivePools();
    await Promise.all(
      hypePools.map(async (pool: IPool) => {
        const leaderboard = await this.rewardService.getLeaderboard(pool.id);
        // If leaderboard is not empty
        if (leaderboard.length > 0) {
          for (let i = 0; i < leaderboard.length && i < 3; i++) {
            const leader = leaderboard[i];
            // Determine reward based on rank
            let rewardAmount;
            switch (leader.rank) {
              case '1':
                rewardAmount = ethers.utils.parseEther('10000'); // Reward for rank 1
                break;
              case '2':
                rewardAmount = ethers.utils.parseEther('5000'); // Reward for rank 2
                break;
              case '3':
                rewardAmount = ethers.utils.parseEther('2500'); // Reward for rank 3
                break;
              default:
                continue; // Skip if not rank 1, 2, or 3
            }
            const user = await this.rewardService.getUserByTelegramId(
              leader.telegramId.toString(),
            );
            if (!user) {
              throw new NotFoundException(
                `User with telegram id: ${leader.telegramId.toString()} was not found`,
              );
            }
            this.logger.debug(`Saving bonus in the reward`);
            const savedBonus = await this.rewardService.saveRewardBonus(
              rewardAmount.toString(),
              pool.tokenAddress,
              user ? user.address : null,
              user.telegramId.toString(),
              user.username,
              pool.id,
            );
            this.logger.log(
              `Saved ${savedBonus.amount} bonus for ${savedBonus.rewardee}`,
            );
          }
        }
      }),
    );
  }
}
