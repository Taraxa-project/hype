import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetFilterDto, PoolDTO } from './dto';
import { HypePool } from './pool.entity';
import { FindManyOptions } from 'typeorm';
import { OrderDirection, PoolOrderByEnum } from '../../utils';

@Injectable()
export class PoolsService {
  private logger = new Logger('PoolsService');

  constructor(
    @InjectRepository(HypePool)
    private repository: Repository<HypePool>,
  ) {}

  async findAll(filterDto: GetFilterDto): Promise<HypePool[]> {
    const result = await this.getByFilters(filterDto);
    return result;
  }

  findById(id: number): Promise<HypePool> {
    const found = this.repository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Hype Pool with ${id} not found!`);
    }
    return found;
  }

  async create(pool: PoolDTO): Promise<HypePool> {
    const newPool = new HypePool({ ...pool });
    const poolEnds = new Date(pool.poolEnds);
    const stored = await this.repository.save({ ...newPool, poolEnds });
    return stored;
  }

  private async findMany(
    conditions: FindManyOptions<HypePool>,
  ): Promise<HypePool[]> {
    const hypePools = await this.repository.find(conditions);
    return hypePools;
  }

  private async getByFilters(filterDto: GetFilterDto): Promise<HypePool[]> {
    const { search, take, skip, orderBy, order } = filterDto;
    const limit = take || 0;
    const offset = skip || 0;
    const orderByType = orderBy || PoolOrderByEnum.NAME;
    const orderDirection: 'ASC' | 'DESC' = order || OrderDirection.ASC;

    const query = this.repository
      .createQueryBuilder('hype_pool')
      .select([
        'hype_pool.id',
        'hype_pool.name',
        'hype_pool.description',
        'hype_pool.accountAddress',
        'hype_pool.minReward',
        'hype_pool.poolCap',
        'hype_pool.poolEnds',
        'hype_pool.createdAt',
        'hype_pool.updatedAt',
      ]);

    if (search) {
      query.where(
        'hype_pool.name ILIKE :search or hype_pool.description ILIKE :search or hype_pool.accountAddress ILIKE :search',
        { search: `%${search}%` },
      );
    }

    try {
      const results = await query
        .skip(offset)
        .take(limit)
        .orderBy(`hype_pool.${orderByType}`, orderDirection)
        .getMany();
      return results;
    } catch (error) {
      this.logger.error(
        `Failed to get pools, DTO: ${JSON.stringify(filterDto)}`,
        error,
      );
      throw new InternalServerErrorException('Internal server exception');
    }
  }
}
