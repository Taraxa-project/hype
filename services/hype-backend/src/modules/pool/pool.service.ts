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
import { PoolPaginate } from '../../models';
import { GetByDTO } from './dto/get-by.dto';

@Injectable()
export class PoolsService {
  private logger = new Logger('PoolsService');

  constructor(
    @InjectRepository(HypePool)
    private repository: Repository<HypePool>,
  ) {}

  public async findAll(filterDto: GetFilterDto): Promise<PoolPaginate> {
    const [pools, total] = await this.getByFilters(filterDto);
    return {
      data: pools || [],
      total,
    };
  }

  public findById(id: number): Promise<HypePool> {
    const found = this.repository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Hype Pool with ${id} not found!`);
    }
    return found;
  }

  public async create(pool: PoolDTO): Promise<HypePool> {
    const newPool = new HypePool({ ...pool });
    const startDate = new Date(pool.startDate);
    const endDate = new Date(pool.endDate);
    const stored = await this.repository.save({
      ...newPool,
      startDate,
      endDate,
    });
    return stored;
  }

  public async findBy({ creatorAddress }: GetByDTO): Promise<HypePool[]> {
    return await this.repository.find({
      where: {
        creatorAddress,
      },
    });
  }

  private async findMany(
    conditions: FindManyOptions<HypePool>,
  ): Promise<HypePool[]> {
    const hypePools = await this.repository.find(conditions);
    return hypePools;
  }

  private async getByFilters(
    filterDto: GetFilterDto,
  ): Promise<[HypePool[], number]> {
    const { search, take, skip, orderBy, order } = filterDto;
    const limit = take || 0;
    const offset = skip || 0;
    const orderByType = orderBy || PoolOrderByEnum.CREATED_AT;
    const orderDirection: 'ASC' | 'DESC' = order || OrderDirection.DESC;

    const query = this.repository
      .createQueryBuilder('hype_pool')
      .select([
        'hype_pool.id',
        'hype_pool.projectName',
        'hype_pool.title',
        'hype_pool.description',
        'hype_pool.pool',
        'hype_pool.creatorAddress',
        'hype_pool.rewardsAddress',
        'hype_pool.minReward',
        'hype_pool.startDate',
        'hype_pool.endDate',
        'hype_pool.createdAt',
        'hype_pool.updatedAt',
      ]);

    if (search) {
      query.where(
        'hype_pool.title ILIKE :search or hype_pool.projectName ILIKE :search or hype_pool.description ILIKE :search or LOWER(hype_pool.creatorAddress) LIKE LOWER(:search) or LOWER(hype_pool.rewardsAddress) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    try {
      const results = await query
        .skip(offset)
        .take(limit)
        .orderBy(`hype_pool.${orderByType}`, orderDirection)
        .getManyAndCount();
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
