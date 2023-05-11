import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { Group } from '../../entities';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  @Get()
  async getAll(): Promise<Group[]> {
    return await this.groupService.getAll();
  }
}
