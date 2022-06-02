import { Test, TestingModule } from '@nestjs/testing';
import { PoolsController } from './pools.controller';
import { PoolsService } from './pools.service';

describe('PoolsController', () => {
  let poolsController: PoolsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PoolsController],
      providers: [PoolsService],
    }).compile();

    poolsController = app.get<PoolsController>(PoolsController);
  });

  describe('root', () => {
    it('should return an array of pools', () => {});
  });
});
