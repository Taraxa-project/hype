import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetFilterDto, PoolDTO } from './dto';
import { HypePool } from './pool.entity';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class PoolsService {
  constructor(
    @InjectRepository(HypePool)
    private repository: Repository<HypePool>,
  ) {}

  findAll(filterDto: GetFilterDto): Promise<HypePool[]> {
    const result = this.findMany({ ...filterDto });
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
}
