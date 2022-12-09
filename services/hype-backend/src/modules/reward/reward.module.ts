import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth';
import { BlockchainModule } from '../blockchain';
import { HypeClaim } from './claim.entity';
import { RewardController } from './reward.controller';
import { HypeReward } from './reward.entity';
import { RewardService } from './reward.service';

@Module({
  imports: [
    BlockchainModule,
    TypeOrmModule.forFeature([HypeReward, HypeClaim]),
    AuthModule,
  ],
  controllers: [RewardController],
  providers: [RewardService],
  exports: [RewardService],
})
export class RewardModule {}
