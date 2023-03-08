import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLRequestModule } from '@golevelup/nestjs-graphql-request';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from '../auth';
import { BlockchainModule } from '../blockchain';
import { UserModule } from '../user';
import { HypeClaim } from '../../entities/claim.entity';
import { RewardController } from './reward.controller';
import { HypeReward } from '../../entities/reward.entity';
import { RewardService } from './reward.service';
import { PoolsController } from './pools.controller';

@Module({
  imports: [
    BlockchainModule,
    TypeOrmModule.forFeature([HypeReward, HypeClaim]),
    GraphQLRequestModule.forRootAsync(GraphQLRequestModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          endpoint: config.get<string>('auth.subGraphEndpoint'),
        };
      },
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    HttpModule,
    UserModule,
  ],
  controllers: [RewardController, PoolsController],
  providers: [RewardService],
  exports: [RewardService],
})
export class RewardModule {}
