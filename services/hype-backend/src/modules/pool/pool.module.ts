import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from '../auth';
import { GraphQlModule } from '../graphql';
import { HypePool } from '../../entities';
import { PoolStatusService } from './pool-status.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HypePool]),
    GraphQlModule,
    ScheduleModule.forRoot(),
    AuthModule,
    HttpModule,
  ],
  providers: [PoolStatusService],
  exports: [PoolStatusService],
})
export class PoolModule {}
