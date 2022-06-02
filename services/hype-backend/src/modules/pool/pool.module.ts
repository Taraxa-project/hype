import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HypePool } from './pool.entity';
import { PoolsController } from './pools.controller';
import { PoolsService } from './pools.service';

@Module({
  imports: [TypeOrmModule.forFeature([HypePool])],
  providers: [PoolsService],
  controllers: [PoolsController],
})
export class PoolModule {}
