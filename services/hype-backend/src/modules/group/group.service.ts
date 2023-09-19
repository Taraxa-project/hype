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

    const searchTerm = search ? `%${search}%` : '%';
    const limit = take || 50;
    const offset = skip || 0;

    const rawQuery = `
      SELECT * 
      FROM (
          SELECT DISTINCT ON (group_username)
              id, 
              group_username, 
              group_id, 
              group_title, 
              member_count, 
              total_messages, 
              week_start, 
              created_at, 
              updated_at
          FROM "group"
          WHERE "group".group_username ILIKE $1 
            OR "group".group_title ILIKE $1
          ORDER BY 
              group_username, 
              total_messages DESC, 
              week_start DESC
      ) AS sub
      ORDER BY 
          total_messages DESC, 
          week_start DESC
      LIMIT $2
      OFFSET $3;
    `;

    const countQuery = this.groupRepository.createQueryBuilder('groupCount');
    if (search) {
      countQuery.where(
        'groupCount.groupUsername ILIKE :search OR groupCount.groupTitle ILIKE :search',
        { search: searchTerm },
      );
    }
    const totalCount = await countQuery.getCount();

    try {
      const rawResults = await this.groupRepository.query(rawQuery, [
        searchTerm,
        limit,
        offset,
      ]);

      const results: Group[] = rawResults.map(this.mapToGroup);
      return [results, totalCount];
    } catch (error) {
      this.logger.error(
        `Failed to get groups, DTO: ${JSON.stringify(filterDto)}`,
        error,
      );
      throw new InternalServerErrorException('Internal server exception');
    }
  }

  private mapToGroup(rawResult: any): Group {
    return new Group({
      id: rawResult.id,
      groupUsername: rawResult.group_username,
      groupId: rawResult.group_id,
      groupTitle: rawResult.group_title,
      memberCount: rawResult.member_count,
      totalMessages: rawResult.total_messages,
      weekStart: rawResult.week_start,
      createdAt: rawResult.created_at,
      updatedAt: rawResult.updated_at,
    });
  }
}
