import { DynamicModule, Module, OnModuleInit, Provider } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Group } from '../../entities';
import { IpfsModule } from '../ipfs';
import { IngesterService } from './ingester.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), IpfsModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule implements OnModuleInit {
  static type = 'web';
  static forRoot(type = 'web'): DynamicModule {
    GroupModule.type = type;
    let providers: Provider[] = [];
    if (type === 'cron') {
      providers = [IngesterService];
    }
    return {
      module: GroupModule,
      providers,
    };
  }

  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    if (GroupModule.type === 'cron') {
      const ingesterService = this.moduleRef.get(IngesterService, {
        strict: false,
      });
      ingesterService?.collectDataForIngesters();
    }
  }
}
