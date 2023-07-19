import {
  Controller,
  Get,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GroupPaginate, GroupService } from './group.service';
import { GetFilterDto } from './dto/get-filter.dto';
import { Group } from '../../entities';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @ApiOkResponse({
    status: HttpStatus.OK,
    type: [Group],
    description: 'Returns filtered telegram groups',
  })
  @Get()
  async getAll(
    @Query(ValidationPipe) filterDto: GetFilterDto,
  ): Promise<GroupPaginate> {
    return await this.groupService.findAll(filterDto);
  }
}
