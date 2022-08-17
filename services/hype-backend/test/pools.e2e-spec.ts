import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ConfigService } from '@nestjs/config';
import { bootstrapTestInstance } from './api';
import { GetFilterDto, PoolDTO } from '../src/modules/pool/dto';
import { PoolsService } from '../src/modules/pool/pool.service';
import { OrderDirection, PoolOrderByEnum } from '../src/utils';
import { GetByDTO } from '../src/modules/pool/dto/get-by.dto';
import { seedTestData } from './seed';

describe('Pools tests', () => {
  let app: INestApplication;
  let poolService: PoolsService;
  let configService: ConfigService;

  beforeAll(async () => {
    ({
      app,
      poolService,
      configService,
    } = await bootstrapTestInstance());
    await app.init();
    await seedTestData(poolService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should retrieve all pools', async () => {
    const filter: GetFilterDto = {
      take: 5,
      skip: 0,
      search: null,
      order: OrderDirection.ASC,
      orderBy: PoolOrderByEnum.CREATED_AT,
    };
    const { body: poolPagination } = await requestPools(
      '',
      HttpStatus.OK,
      filter,
    );
    expect(Array.isArray(poolPagination.data)).toBe(true);
    expect(poolPagination.data.length).toBe(5);
    expect(poolPagination.total).toBe(20);
  });

  it('should retrieve all pools using search', async () => {
    const filter: GetFilterDto = {
      take: 21,
      skip: 0,
      search: '0xA2222D333C33333339999999911111111111eee1',
      order: OrderDirection.ASC,
      orderBy: PoolOrderByEnum.CREATED_AT,
    };
    const { body: poolPagination } = await requestPools(
      '',
      HttpStatus.OK,
      filter,
    );
    expect(Array.isArray(poolPagination.data)).toBe(true);
    expect(poolPagination.data.length).toBe(7);
    expect(poolPagination.total).toBe(7);
  });

  it('should retrieve all pools by creator address', async () => {
    const creatorAddress = '0xA2222D333C33333339999999911111111111eee1';
    const filter: GetByDTO = {
      creatorAddress,
    };
    const { body: pools } = await requestPoolsBy('', HttpStatus.OK, filter);
    expect(Array.isArray(pools)).toBe(true);
    expect(pools.length).toBe(7);
    expect(pools[0].creatorAddress).toBe(creatorAddress);

    const { body: poolById } = await requestPoolById(pools[0].id,  HttpStatus.OK);
    expect(poolById.creatorAddress).toBe(creatorAddress);
  });

  it('should add a new pool', async () => {
    const newPool: PoolDTO = {
      projectName: 'FoxCoin Hype',
      title: 'FoxCoin Staking Launch!',
      description:
        'FOX is an Ethereum token that governs ShapeShift, a decentralized exchange. By participating in the ShapeShift DAO (decentralized autonomous organization), FOX holders can vote on future asset integrations, products, and fee structures for the platform.',
      rewardsAddress: '0xc770EEfAd204B5180dF6a14Ee197D99d808ee52d',
      creatorAddress: '0xA2222D333C33333339999999911111111111eee4',
      pool: 100000,
      minReward: 1,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 5)),
    };
    const { body: createdPool } = await postPool(
      '',
      HttpStatus.CREATED,
      newPool,
    );
    expect(createdPool.projectName).toBe(newPool.projectName);
    expect(createdPool.title).toBe(newPool.title);
    expect(createdPool.creatorAddress).toBe(newPool.creatorAddress);
  });

  it('should return 400 when trying to create pool with bad address format', async () => {
    const newPool: PoolDTO = {
      projectName: 'FoxCoin Hype',
      title: 'FoxCoin Staking Launch!',
      description:
        'FOX is an Ethereum token that governs ShapeShift, a decentralized exchange. By participating in the ShapeShift DAO (decentralized autonomous organization), FOX holders can vote on future asset integrations, products, and fee structures for the platform.',
      rewardsAddress: 'reward address',
      creatorAddress: 'address here',
      pool: 100000,
      minReward: 1,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 5)),
    };
    const { status } = await postPool(
      '',
      HttpStatus.BAD_REQUEST,
      newPool,
    );
    expect(status).toBe(400);
  });


  const requestPoolById = async (
    id: string,
    status: HttpStatus,
  ): Promise<any> =>
    await request(app.getHttpServer())
      .get(`/pools/${id}`)
      .expect(status);

  const requestPools = async (
    url: string,
    status: HttpStatus,
    filterDTO: Partial<GetFilterDto>,
  ): Promise<any> =>
    await request(app.getHttpServer())
      .get(`/pools/${url}`)
      .query(filterDTO)
      .expect(status);

  const requestPoolsBy = async (
    url: string,
    status: HttpStatus,
    filterDTO: GetByDTO,
  ): Promise<any> =>
    await request(app.getHttpServer())
      .get(`/pools/by/${url}`)
      .query(filterDTO)
      .expect(status);

  const postPool = async (
    url: string,
    status: HttpStatus,
    body: PoolDTO,
  ): Promise<any> =>
    await request(app.getHttpServer())
      .post(`/pools/${url}`)
      .send({
        ...body,
      })
      .expect(status);
});
