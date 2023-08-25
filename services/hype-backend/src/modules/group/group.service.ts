import { Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../../entities/group.entity';
import { GetFilterDto } from './dto/get-filter.dto';
export interface GroupPaginate {
  data: any[];
  total: number;
}

@Injectable()
export class GroupService {
  private logger = new Logger('GroupService');

  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  public async findAll(filterDto: GetFilterDto): Promise<GroupPaginate> {
    const [groups, total] = await this.getByFilters(filterDto);
    return {
      data: groups || [],
      total,
    };
  }

  private async getByFilters(
    filterDto: GetFilterDto,
  ): Promise<[Group[], number]> {
    const { search, take, skip } = filterDto;
    const limit = take || 0;
    const offset = skip || 0;

    const query = this.groupRepository
      .createQueryBuilder('group')
      .select([
        'group.id',
        'group.groupUsername',
        'group.groupId',
        'group.groupTitle',
        'group.memberCount',
        'group.totalMessages',
        'group.weekStart',
        'group.createdAt',
        'group.updatedAt',
      ]);

    if (search) {
      query.where(
        'group.groupUsername ILIKE :search or group.groupTitle ILIKE :search',
        { search: `%${search}%` },
      );
    }

    try {
      const results = await query
        .skip(offset)
        .take(limit)
        .orderBy('group.weekStart', 'DESC')
        .addOrderBy('group.totalMessages', 'DESC')
        .getManyAndCount();
      return results;
    } catch (error) {
      this.logger.error(
        `Failed to get groups, DTO: ${JSON.stringify(filterDto)}`,
        error,
      );
      throw new InternalServerErrorException('Internal server exception');
    }
  }
}
