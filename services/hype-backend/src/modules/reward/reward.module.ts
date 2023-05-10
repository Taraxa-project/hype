import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from '../auth';
import { BlockchainModule } from '../blockchain';
import { HypeUser } from '../user';
import { HypeClaim } from '../../entities/claim.entity';
import { RewardController } from './reward.controller';
import { HypeReward } from '../../entities/reward.entity';
import { RewardService } from './reward.service';
import { PoolsController } from './pools.controller';
import { GraphQlModule } from '../graphql';

@Module({
  imports: [
    BlockchainModule,
    TypeOrmModule.forFeature([HypeReward, HypeClaim, HypeUser]),
    GraphQlModule,
    ScheduleModule.forRoot(),
    AuthModule,
    HttpModule,
  ],
  controllers: [RewardController, PoolsController],
  providers: [RewardService],
  exports: [RewardService],
})
export class RewardModule {}
