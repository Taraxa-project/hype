import { DynamicModule, Module, Provider } from '@nestjs/common';
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
export class GroupModule {
  static forRoot(type = 'web'): DynamicModule {
    let providers: Provider[] = [];
    if (type === 'cron') {
      providers = [IngesterService];
    }
    return {
      module: GroupModule,
      providers,
    };
  }
}
