import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GraphQlService } from '../graphql';
import { IPool } from '../../models';

@Injectable()
export class PoolStatusService implements OnModuleInit {
  private readonly logger = new Logger(PoolStatusService.name);
  constructor(private graphQlService: GraphQlService) {}
  onModuleInit() {
    this.logger.debug(`Init ${PoolStatusService.name} cron`);
  }

  @Cron(CronExpression.EVERY_HOUR) // Once a week Saturday at 23:00
  async updatePoolStats() {
    const allHypePools = await this.getAllActivePools();
  }

  async getAllActivePools(): Promise<IPool[]> {
    const allActivePools: IPool[] = [];
    const take = 100;
    let skip = 0;

    while (true) {
      try {
        const { hypePools } = await this.graphQlService.getPools(take, skip);
        allActivePools.push(...hypePools);
        if (hypePools.length < take) {
          break;
        }

        skip += take;
      } catch (e) {
        console.error(e);
        break;
      }
    }

    return allActivePools;
  }
}
