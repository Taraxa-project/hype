import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockchainModule } from '../blockchain';
import { RewardController } from './reward.controller';
import { HypeReward } from './reward.entity';
import { RewardService } from './reward.service';

@Module({
  imports: [BlockchainModule, TypeOrmModule.forFeature([HypeReward])],
  controllers: [RewardController],
  providers: [RewardService],
  exports: [RewardService],
})
export class RewardModule {}
