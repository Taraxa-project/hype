import { MigrationInterface, QueryRunner } from 'typeorm';
import { IPool } from '../models';

import PoolsJSON from './pools.json';

require('dotenv').config({ path: '../../.env' });

export class Seed9999999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.seedPools(queryRunner);
    await queryRunner.query(
      `SELECT setval(
        pg_get_serial_sequence('public.hype_pool', 'id'),
        (
            SELECT MAX("id")
            FROM public.hype_pool
        ) + 1
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}

  private async seedPools(queryRunner: QueryRunner) {
    const poolTable = await queryRunner.getTable('public.hype_pool');

    if (!poolTable) {
      console.log('hype_pool table does not exist.');
      return;
    }

    await Promise.all(
      (PoolsJSON as unknown as IPool[]).map(async (pool) => {
        queryRunner.query(
          `INSERT INTO public.hype_pool (
            "projectName", 
            "title", 
            "description", 
            "pool", 
            "rewardsAddress", 
            "creatorAddress", 
            "minReward", 
            "startDate", 
            "endDate" 
            ) VALUES (
              '${pool.projectName}', 
              '${pool.title}', 
              '${pool.description}', 
              '${pool.pool}', 
              '${pool.rewardsAddress}', 
              '${pool.creatorAddress}', 
              '${pool.minReward}', 
              '${pool.startDate}', 
              '${pool.endDate}' 
            )`,
        );
      }),
    );
  }
}
