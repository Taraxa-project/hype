import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth';
import { BlockchainModule } from '../blockchain';
import { UserModule } from '../user';
import { HypeClaim } from '../../entities/claim.entity';
import { RewardController } from './reward.controller';
import { HypeReward } from '../../entities/reward.entity';
import { RewardService } from './reward.service';

@Module({
  imports: [
    BlockchainModule,
    TypeOrmModule.forFeature([HypeReward, HypeClaim]),
    AuthModule,
    HttpModule,
    UserModule,
  ],
  controllers: [RewardController],
  providers: [RewardService],
  exports: [RewardService],
})
export class RewardModule {}
