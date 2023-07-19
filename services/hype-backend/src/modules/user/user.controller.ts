import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDTO } from './dto';
import { HypeUser } from '../../entities/user.entity';
import { UsersService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetAddress } from '../auth/get-address.decorator';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private readonly service: UsersService) {}

  @ApiOkResponse({
    status: HttpStatus.OK,
    type: [HypeUser],
    description: 'Returns user by address',
  })
  @Get('me')
  @ApiBearerAuth('authorization')
  @UseGuards(AuthGuard('jwt'))
  public getUserBy(@GetAddress() address: string): Promise<HypeUser> {
    return this.service.getUserByAddress(address);
  }

  @Post()
  @ApiBearerAuth('authorization')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDTO,
    description: 'Returns a new created or an updated user',
  })
  public async createOrUpdateUser(@Body() userDTO: UserDTO): Promise<HypeUser> {
    return await this.service.updateAccount(userDTO);
  }
}
