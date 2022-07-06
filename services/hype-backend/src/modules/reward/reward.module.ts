import { Module } from '@nestjs/common';
import { BlockchainModule } from '../blockchain';
import { RewardService } from './reward.service';

@Module({
  imports: [BlockchainModule],
  providers: [RewardService],
  exports: [RewardService],
})
export class RewardModule {}
