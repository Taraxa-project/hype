import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockchainModule } from '../blockchain';
import { HypeReward } from './reward.entity';
import { RewardService } from './reward.service';

@Module({
  imports: [BlockchainModule, TypeOrmModule.forFeature([HypeReward])],
  providers: [RewardService],
  exports: [RewardService],
})
export class RewardModule {}
