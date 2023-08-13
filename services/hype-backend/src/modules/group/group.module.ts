import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Group } from '../../entities';
import { IpfsModule } from '../ipfs';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), IpfsModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule implements OnModuleInit {
  constructor(private readonly groupService: GroupService) {}

  onModuleInit() {
    this.groupService.collectDataForIngesters();
  }
}
