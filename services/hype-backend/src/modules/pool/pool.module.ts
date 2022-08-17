import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HypePool } from './pool.entity';
import { PoolsController } from './pool.controller';
import { PoolsService } from './pool.service';
import { AuthModule } from '../auth';

@Module({
  imports: [TypeOrmModule.forFeature([HypePool]), AuthModule],
  providers: [PoolsService],
  controllers: [PoolsController],
})
export class PoolModule {}
