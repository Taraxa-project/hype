import { Module } from '@nestjs/common';
import { AuthModule } from '../auth';
import { BlockchainModule } from '../blockchain';
import { ContractPoolsController } from './contract-pool.controller';
import { ContractPoolsService } from './contract-pool.service';

@Module({
  imports: [BlockchainModule, AuthModule],
  providers: [ContractPoolsService],
  controllers: [ContractPoolsController],
  exports: [ContractPoolsService],
})
export class ContractPoolsModule {}
