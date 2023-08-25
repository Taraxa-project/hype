import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth';
import { IpfsController } from './ipfs.controller';
import { IpfsService } from './ipfs.service';

@Module({
  imports: [AuthModule, HttpModule],
  providers: [IpfsService],
  controllers: [IpfsController],
  exports: [IpfsService],
})
export class IpfsModule {}
