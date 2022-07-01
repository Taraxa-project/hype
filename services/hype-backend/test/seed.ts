import PoolsJSON from '../src/migrations/pools.json';
import { IPool } from '../src/models';
import { PoolsService } from '../src/modules/pool/pool.service';

export const seedTestData = async (poolService: PoolsService) => {
  await Promise.all(
    (PoolsJSON as unknown as IPool[]).map(async (pool) => {
      await poolService.create(pool);
    }),
  );
};
