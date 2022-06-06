import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HypePool } from './pool.entity';
import { PoolsController } from './pool.controller';
import { PoolsService } from './pool.service';

@Module({
  imports: [TypeOrmModule.forFeature([HypePool])],
  providers: [PoolsService],
  controllers: [PoolsController],
})
export class PoolModule {}
